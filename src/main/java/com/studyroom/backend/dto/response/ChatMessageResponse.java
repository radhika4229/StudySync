package com.studyroom.backend.dto.response;

import com.studyroom.backend.enums.MessageType;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ChatMessageResponse {
    private Long id;
    private String roomId;
    private UserResponse sender;
    private String content;
    private MessageType type;
    private boolean isAiResponse;
    private String replyToMessageId;
    private LocalDateTime createdAt;
}

