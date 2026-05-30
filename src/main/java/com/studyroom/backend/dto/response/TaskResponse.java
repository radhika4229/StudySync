package com.studyroom.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponse {

    private String id;
    private String title;
    private String description;
    private boolean completed;
    private String priority;
    private LocalDateTime dueDate;

    private String roomId;

    private Long createdById;
    private String createdByUsername;

    private Long assignedToId;
    private String assignedToUsername;

    private LocalDateTime createdAt;
}