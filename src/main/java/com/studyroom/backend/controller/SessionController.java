package com.studyroom.backend.controller;

import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.dto.response.SessionResponse;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.StudySessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final StudySessionService sessionService;

    @PostMapping("/rooms/{roomId}/start")
    public ResponseEntity<ApiResponse<SessionResponse>> startSession(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(
                "Session started", sessionService.startSession(user.getId(), roomId)));
    }

    @PutMapping("/{sessionId}/end")
    public ResponseEntity<ApiResponse<SessionResponse>> endSession(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String sessionId,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(ApiResponse.success(
                "Session ended", sessionService.endSession(user.getId(), sessionId, notes)));
    }

    @PostMapping("/{sessionId}/join")
    public ResponseEntity<ApiResponse<SessionResponse>> joinSession(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String sessionId) {
        return ResponseEntity.ok(ApiResponse.success(
                sessionService.joinSession(user.getId(), sessionId)));
    }

    @GetMapping("/rooms/{roomId}/active")
    public ResponseEntity<ApiResponse<SessionResponse>> getActiveSession(
            @PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(
                sessionService.getActiveSession(roomId).orElse(null)));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<List<SessionResponse>>> getRoomSessions(
            @PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(sessionService.getRoomSessions(roomId)));
    }
}
