package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.AIQueryRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

        private final AIService aiService;

    @PostMapping("/query")
    public ResponseEntity<ApiResponse<String>> query(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody AIQueryRequest request) {

           if (principal == null) {
            log.warn("AI query attempted with no authenticated principal");
            return ResponseEntity
                    .status(401)
                    .body(ApiResponse.error("Unauthorized: no authenticated user"));
        }

        log.info("AI query received from user id={} type={}",
                principal.getId(), request.getQueryType());
   String aiResponse =aiService.processTypedQuery(principal.getId(), request);

        return ResponseEntity.ok(ApiResponse.success("AI response", aiResponse));
    }
}
