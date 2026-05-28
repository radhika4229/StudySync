package com.studyroom.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageDTO {
    private Long id;
    private String content;
    private String senderUsername;
    private String senderAvatarColor;
    private Long roomId;
    private String type;
    private LocalDateTime createdAt;
}
