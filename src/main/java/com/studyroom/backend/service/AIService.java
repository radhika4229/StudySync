package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.AIQueryRequest;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.BadgeType;
import com.studyroom.backend.exception.ResourceNotFoundException;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIService {

    private final ChatClient chatClient;       // ✅ Injected from AIConfig
    private final UserRepository userRepository;
    private final GamificationService gamificationService;

    @Transactional
    public String processTypedQuery(Long userId, AIQueryRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with id: " + userId));

        String prompt = buildPrompt(request);

        log.debug("Sending prompt to AI for user id={}: {}", userId, prompt);

        String aiResponse = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

        gamificationService.checkAndAwardBadge(user, BadgeType.AI_EXPLORER);

        log.info("AI query completed successfully for user id={}", userId);

        return aiResponse;
    }

    private String buildPrompt(AIQueryRequest request) {
        if (request.getQueryType() == null || request.getQueryType().isBlank()) {
            return request.getQuestion();
        }
        return switch (request.getQueryType().toUpperCase()) {
            case "SUMMARIZE" -> "Summarize the following: " + request.getQuestion();
            case "EXPLAIN"   -> "Explain in simple terms: " + request.getQuestion();
            case "QUIZ"      -> "Generate a short quiz based on: " + request.getQuestion();
            case "INTERVIEW" ->
                    "Generate 10 Java backend interview questions with answers on: "
                            + request.getQuestion();
            default          -> request.getQuestion();
        };
    }

    public String processQuery(String query, String subject) {
        try {
            String prompt = "Subject: " + subject + "\nQuestion: " + query;

            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("AI query failed", e);
            return "AI service is currently unavailable.";
        }
    }
}
