package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.ChatMessageRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.dto.response.ChatMessageResponse;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // REST endpoint for sending message
    @PostMapping("/rooms/{roomId}/messages")
    public ResponseEntity<ApiResponse<ChatMessageResponse>> sendMessage(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomId,
            @RequestBody ChatMessageRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                chatService.sendMessage(user.getId(), roomId, request)));
    }

    // REST endpoint for fetching history
    @GetMapping("/rooms/{roomId}/messages")
    public ResponseEntity<ApiResponse<List<ChatMessageResponse>>> getMessages(
            @PathVariable String roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(ApiResponse.success(
                chatService.getRoomMessages(roomId, page, size)));
    }
}
