package com.studyroom.backend.dto.request;

import com.studyroom.backend.enums.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CreateTaskRequest {
    @NotBlank
    private String title;
    private String description;
    private String assignedToId;
    private LocalDateTime dueDate;
    private TaskPriority priority = TaskPriority.MEDIUM;
}
