package com.studyroom.backend.config;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "app")
@Getter @Setter
public class AppProperties {

    private Jwt jwt = new Jwt();
    private OAuth2 oauth2 = new OAuth2();
    private String frontendUrl;

    @Getter @Setter
    public static class Jwt {
        private String secret;
        private long expiration;
        private long refreshExpiration;
    }

    @Getter @Setter
    public static class OAuth2 {
        private List<String> authorizedRedirectUris;
    }
}

