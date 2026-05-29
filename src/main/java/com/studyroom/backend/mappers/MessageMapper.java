package com.studyroom.backend.mappers;

import com.studyroom.backend.dto.response.ChatMessageResponse;
import com.studyroom.backend.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageMapper {

    private final UserMapper userMapper;

    public ChatMessageResponse toResponse(ChatMessage msg) {
        return ChatMessageResponse.builder()
                .id(msg.getId())
                .roomId(msg.getRoom().getId())
                .sender(msg.getSender() != null ? userMapper.toResponse(msg.getSender()) : null)
                .content(msg.getContent())
                .type(msg.getType())
                .isAiResponse(msg.isAiResponse())
                .replyToMessageId(msg.getReplyToMessageId())
                .createdAt(msg.getCreatedAt())
                .build();
    }
}

