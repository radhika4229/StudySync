package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.LoginRequest;
import com.studyroom.backend.dto.request.RegisterRequest;
import com.studyroom.backend.dto.response.AuthResponse;
import com.studyroom.backend.model.User;
import com.studyroom.backend.repository.UserRepository;
import com.studyroom.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    private static final List<String> AVATAR_COLORS = List.of(
            "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
            "#f97316", "#eab308", "#22c55e", "#14b8a6"
    );

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        String color = AVATAR_COLORS.get(new Random().nextInt(AVATAR_COLORS.size()));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .avatarColor(color)
                .build();

        userRepository.save(user);
        String token = jwtTokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .userId(user.getId())
                .avatarColor(user.getAvatarColor())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtTokenProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .userId(user.getId())
                .avatarColor(user.getAvatarColor())
                .build();
    }
}