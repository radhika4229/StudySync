package com.studyroom.backend.dto.request;

import com.studyroom.backend.enums.MessageType;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ChatMessageRequest {
    private String content;
    private MessageType type = MessageType.TEXT;
    private String replyToMessageId;
}
