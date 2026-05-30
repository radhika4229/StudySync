package com.studyroom.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TestEnv {

    @Value("${OPENROUTER_API_KEY:NOT_FOUND}")
    private String key;

    @PostConstruct
    public void init() {
        System.out.println("================================");
        System.out.println("OPENROUTER KEY = " + key);
        System.out.println("================================");
    }
}