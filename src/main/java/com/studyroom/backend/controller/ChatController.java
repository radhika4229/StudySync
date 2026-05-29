package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.ChatMessageRequest;
import com.studyroom.backend.dto.response.ChatMessageResponse;
import com.studyroom.backend.entity.ChatMessage;
import com.studyroom.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // WebSocket endpoint - receives and broadcasts chat messages
    @MessageMapping("/room/{roomId}/chat")
    @SendTo("/topic/room/{roomId}/messages")
    public ChatMessageResponse sendMessage(
            @DestinationVariable Long roomId,
            @Payload ChatMessageRequest request,
            Principal principal) {
        return chatService.saveMessage(
                roomId, request.getContent(),
                principal.getName(), ChatMessage.MessageType.CHAT);
    }

    // WebSocket endpoint - user join notification
    @MessageMapping("/room/{roomId}/join")
    @SendTo("/topic/room/{roomId}/activity")
    public ChatMessageResponse userJoined(
            @DestinationVariable Long roomId,
            Principal principal) {
        return chatService.saveMessage(
                roomId, principal.getName() + " joined the room",
                principal.getName(), ChatMessage.MessageType.JOIN);
    }

    // WebSocket endpoint - user leave notification
    @MessageMapping("/room/{roomId}/leave")
    @SendTo("/topic/room/{roomId}/activity")
    public ChatMessageResponse userLeft(
            @DestinationVariable Long roomId,
            Principal principal) {
        return chatService.saveMessage(
                roomId, principal.getName() + " left the room",
                principal.getName(), ChatMessage.MessageType.LEAVE);
    }

    // REST endpoint - get chat history
    @GetMapping("/{roomId}/messages")
    @ResponseBody
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatService.getRoomMessages(roomId));
    }
}
