package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.ChatMessageRequest;
import com.studyroom.backend.dto.response.ChatMessageResponse;
import com.studyroom.backend.entity.ChatMessage;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.MessageType;
import com.studyroom.backend.mappers.MessageMapper;
import com.studyroom.backend.repository.ChatMessageRepository;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatMessageRepository messageRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;
    private final AIService aiService;
    private final SimpMessagingTemplate messagingTemplate;
    private final MessageMapper messageMapper;

    @Transactional
    public ChatMessageResponse sendMessage(String userId, String roomId,
                                           ChatMessageRequest request) {
        User sender = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        ChatMessage message = ChatMessage.builder()
                .room(room)
                .sender(sender)
                .content(request.getContent())
                .type(request.getType() != null ? request.getType() : MessageType.TEXT)
                .replyToMessageId(request.getReplyToMessageId())
                .build();

        message = messageRepository.save(message);
        ChatMessageResponse response = messageMapper.toResponse(message);

        // Broadcast to room
        messagingTemplate.convertAndSend("/topic/room/" + roomId + "/chat", response);

        // Check for AI trigger (@ai or /ai)
        String content = request.getContent().trim();
        if (content.startsWith("@ai ") || content.startsWith("/ai ")) {
            String aiQuery = content.substring(4).trim();
            handleAIMessage(userId, room, sender, aiQuery);
        }

        return response;
    }

    private void handleAIMessage(String userId, StudyRoom room,
                                 User sender, String query) {
        // Async AI response
        String aiResponse = aiService.processQuery(query, room.getSubject());

        ChatMessage aiMessage = ChatMessage.builder()
                .room(room)
                .content("🤖 **AI Assistant:** " + aiResponse)
                .type(MessageType.AI_RESPONSE)
                .isAiResponse(true)
                .build();

        aiMessage = messageRepository.save(aiMessage);
        ChatMessageResponse aiResponse2 = messageMapper.toResponse(aiMessage);
        messagingTemplate.convertAndSend("/topic/room/" + room.getId() + "/chat", aiResponse2);
    }

    public List<ChatMessageResponse> getRoomMessages(String roomId, int page, int size) {
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return messageRepository.findByRoomOrderByCreatedAtDesc(
                        room, PageRequest.of(page, size))
                .stream().map(messageMapper::toResponse).toList();
    }
}
