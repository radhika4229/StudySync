package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.LoginRequest;
import com.studyroom.backend.dto.request.RegisterRequest;
import com.studyroom.backend.dto.response.AuthResponse;
import com.studyroom.backend.dto.response.UserResponse;
import com.studyroom.backend.entity.RefreshToken;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.AuthProvider;
import com.studyroom.backend.enums.Role;
import com.studyroom.backend.mappers.UserMapper;
import com.studyroom.backend.repository.RefreshTokenRepository;
import com.studyroom.backend.repository.UserRepository;
import com.studyroom.backend.security.JwtTokenProvider;
import com.studyroom.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authManager;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .provider(AuthProvider.LOCAL)
                .role(Role.ROLE_USER)
                .emailVerified(false)
                .build();

        user = userRepository.save(user);
        String token = tokenProvider.generateTokenFromUserId(user.getId());
        String refreshToken = createRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .user(userMapper.toResponse(user))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = tokenProvider.generateToken(authentication);
        String refreshToken = createRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .user(userMapper.toResponse(user))
                .build();
    }

    @Transactional
    public AuthResponse refreshToken(String token) {
        System.out.println("SERVICE TOKEN = [" + token + "]");
token=token.trim();
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException("Refresh token expired. Please login again.");
        }

        String newAccessToken = tokenProvider.generateTokenFromUserId(
                refreshToken.getUser().getId());

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(token)
                .user(userMapper.toResponse(refreshToken.getUser()))
                .build();
    }

    @Transactional
    public void logout(Long userId) {
        userRepository.findById(userId).ifPresent(user ->
                refreshTokenRepository.deleteByUser(user));
    }

    private String createRefreshToken(User user) {
        refreshTokenRepository.findByUser(user).ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(604800000L))
                .build();

        return refreshTokenRepository.save(refreshToken).getToken();
    }
    public UserResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toResponse(user);
    }


}
