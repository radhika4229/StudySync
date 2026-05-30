package com.studyroom.backend.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {

    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) {
        return builder
                .defaultSystem("""
                        You are a helpful AI study assistant for a collaborative
                        study room platform. Provide clear, accurate, and concise
                        answers. When generating quizzes, format them with
                        numbered questions and multiple-choice options.
                        """)
                .build();
    }
}
