package com.studyroom.backend.security.oauth2;
import com.studyroom.backend.enums.AuthProvider;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.Role;
import com.studyroom.backend.repository.UserRepository;
import com.studyroom.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest request, OAuth2User oAuth2User) {
        String registrationId = request.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email;
        String name;
        String avatarUrl;
        String providerId;
       AuthProvider provider;

        if ("google".equals(registrationId)) {
            email = (String) attributes.get("email");
            name = (String) attributes.get("name");
            avatarUrl = (String) attributes.get("picture");
            providerId = (String) attributes.get("sub");
            provider = AuthProvider.GOOGLE;
        } else if ("github".equals(registrationId)) {
            email = (String) attributes.get("email");
            name = (String) attributes.get("name");
            if (name == null) name = (String) attributes.get("login");
            avatarUrl = (String) attributes.get("avatar_url");
            providerId = String.valueOf(attributes.get("id"));
            provider = AuthProvider.GITHUB;
            if (email == null) email = providerId + "@github.com";
        } else {
            throw new OAuth2AuthenticationException("Unsupported provider: " + registrationId);
        }

        final String finalEmail = email;
        final String finalName = name;
        final String finalAvatar = avatarUrl;
        final String finalProviderId = providerId;
        final AuthProvider finalProvider = provider;

        User user = userRepository.findByEmail(email)
                .map(existing -> {
                    existing.setFullName(finalName);
                    existing.setAvatarUrl(finalAvatar);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    String username = generateUsername(finalName, finalEmail);
                    User newUser = User.builder()
                            .email(finalEmail)
                            .username(username)
                            .fullName(finalName)
                            .avatarUrl(finalAvatar)
                            .provider(finalProvider)
                            .providerId(finalProviderId)
                            .role(Role.ROLE_USER)
                            .emailVerified(true)
                            .build();
                    return userRepository.save(newUser);
                });

        return UserPrincipal.create(user, attributes);
    }

    private String generateUsername(String name, String email) {
        String base = name != null
                ? name.toLowerCase().replaceAll("\\s+", "_")
                : email.split("@")[0];
        String username = base;
        int i = 1;
        while (userRepository.existsByUsername(username)) {
            username = base + i++;
        }
        return username;
    }
}

