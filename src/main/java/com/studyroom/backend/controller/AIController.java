package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.AIQueryRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.enums.BadgeType;
import com.studyroom.backend.repository.UserRepository;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.AIService;
import com.studyroom.backend.service.GamificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final AIService aiService;
    private final GamificationService gamificationService;
    private final UserRepository userRepository;

    @PostMapping("/query")
    public ResponseEntity<ApiResponse<String>> query(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AIQueryRequest request) {

        String response = aiService.processTypedQuery(request);

        // Award AI Explorer badge
        userRepository.findById(principal.getId()).ifPresent(user ->
                gamificationService.checkAndAwardBadge(user, BadgeType.AI_EXPLORER));

        return ResponseEntity.ok(ApiResponse.success("AI response", response));
    }
}

