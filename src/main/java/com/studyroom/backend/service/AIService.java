package com.studyroom.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.*;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AIService {

    private final ChatClient.Builder chatClientBuilder;

    public String processQuery(String query, String subject) {
        ChatClient chatClient = chatClientBuilder.build();
        String systemPrompt = buildSystemPrompt(subject);
        try {
            return chatClient.prompt()
                    .system(systemPrompt)
                    .user(query)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("AI query failed", e);
            return "Sorry, AI is currently unavailable. Please try again.";
        }
    }

    public String processTypedQuery(AIQueryRequest request) {
        ChatClient chatClient = chatClientBuilder.build();
        String prompt = buildPromptByType(request);
        try {
            return chatClient.prompt()
                    .system("You are an intelligent study assistant for students. " +
                            "Be concise, clear, and educational. Use markdown formatting.")
                    .user(prompt)
                    .call()
                    .content();
        } catch (Exception e) {
            log.error("AI typed query failed", e);
            return "Sorry, AI assistant is currently unavailable.";
        }
    }

    private String buildSystemPrompt(String subject) {
        return String.format(
                "You are an AI study assistant specialized in %s. " +
                        "Help students understand concepts, generate quizzes, " +
                        "summarize notes, and create interview questions. " +
                        "Be concise, accurate, and educational. Use markdown formatting " +
                        "for better readability.", subject != null ? subject : "general subjects"
        );
    }

    private String buildPromptByType(AIQueryRequest request) {
        String context = request.getContext() != null ? "\nContext: " + request.getContext() : "";
        return switch (request.getType()) {
            case EXPLAIN ->
                    "Explain the following topic clearly and simply: " + request.getQuery() + context;
            case GENERATE_QUIZ ->
                    "Generate 5 multiple choice quiz questions about: " + request.getQuery() +
                            ". Include answers." + context;
            case SUMMARIZE_NOTES ->
                    "Summarize the following notes concisely: " + request.getQuery();
            case CREATE_INTERVIEW_QUESTIONS ->
                    "Create 10 interview questions for: " + request.getQuery() +
                            ". Include expected answers." + context;
            case GENERAL -> request.getQuery() + context;
        };
    }
}
