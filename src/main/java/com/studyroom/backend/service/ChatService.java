package com.studyroom.backend.service;

import com.studyroom.backend.dto.response.ChatMessageDTO;
import com.studyroom.backend.exception.ResourceNotFoundException;
import com.studyroom.backend.model.ChatMessage;
import com.studyroom.backend.model.StudyRoom;
import com.studyroom.backend.model.User;
import com.studyroom.backend.repository.ChatMessageRepository;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatMessageDTO saveMessage(Long roomId, String content,
                                      String senderEmail, ChatMessage.MessageType type) {
        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        ChatMessage message = ChatMessage.builder()
                .content(content)
                .sender(sender)
                .room(room)
                .type(type)
                .build();

        message = chatMessageRepository.save(message);
        return mapToDTO(message);
    }

    public List<ChatMessageDTO> getRoomMessages(Long roomId) {
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return chatMessageRepository.findTop50ByRoomOrderByCreatedAtAsc(room)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ChatMessageDTO mapToDTO(ChatMessage m) {
        return ChatMessageDTO.builder()
                .id(m.getId())
                .content(m.getContent())
                .senderUsername(m.getSender().getUsername())
                .senderAvatarColor(m.getSender().getAvatarColor())
                .roomId(m.getRoom().getId())
                .type(m.getType().name())
                .createdAt(m.getCreatedAt())
                .build();
    }
}