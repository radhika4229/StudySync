package com.studyroom.backend.dto.request;

import lombok.Data;

@Data
public class ChatMessageRequest {
    private String content;
    private String type;
}
