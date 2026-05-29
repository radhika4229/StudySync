package com.studyroom.backend.security.oauth2;



import com.studyroom.backend.config.AppProperties;
import com.studyroom.backend.security.JwtTokenProvider;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final AppProperties appProperties;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String targetUrl = determineTargetUrl(request, response, authentication);
        if (response.isCommitted()) return;
        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) {
        String redirectUri = request.getParameter("redirect_uri");
        List<String> authorizedRedirectUris = appProperties.getOauth2().getAuthorizedRedirectUris();

        if (redirectUri != null && !isAuthorizedRedirectUri(redirectUri, authorizedRedirectUris)) {
            throw new RuntimeException("Unauthorized redirect URI");
        }

        String targetUrl = redirectUri != null ? redirectUri
                : appProperties.getFrontendUrl() + "/oauth2/redirect";

        String token = tokenProvider.generateToken(authentication);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .build().toUriString();
    }

    private boolean isAuthorizedRedirectUri(String uri, List<String> authorizedUris) {
        URI clientRedirectUri = URI.create(uri);
        return authorizedUris.stream().anyMatch(authorizedUri -> {
            URI authorizedURI = URI.create(authorizedUri);
            return authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                    && authorizedURI.getPort() == clientRedirectUri.getPort();
        });
    }
}
