package com.studyroom.backend.controller;

import com.studyroom.backend.dto.response.SessionResponse;
import com.studyroom.backend.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping("/start")
    public ResponseEntity<SessionDTO> startSession(
            @RequestParam Long roomId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                sessionService.startSession(roomId, userDetails.getUsername()));
    }

    @PostMapping("/{sessionId}/end")
    public ResponseEntity<SessionDTO> endSession(
            @PathVariable Long sessionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                sessionService.endSession(sessionId, userDetails.getUsername()));
    }

    @GetMapping("/history")
    public ResponseEntity<List<SessionDTO>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                sessionService.getUserSessionHistory(userDetails.getUsername()));
    }

    @GetMapping("/stats")
    public ResponseEntity<SessionResponse> getStats(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                sessionService.getUserStats(userDetails.getUsername()));
    }
}