package com.studyroom.backend.controller;

import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMyAnalytics(
            @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getUserAnalytics(user.getId())));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRoomAnalytics(
            @PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(
                analyticsService.getRoomAnalytics(roomId)));
    }
}

