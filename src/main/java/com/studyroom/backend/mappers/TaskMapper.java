package com.studyroom.backend.mappers;

import com.studyroom.backend.dto.response.TaskResponse;
import com.studyroom.backend.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskResponse toResponse(Task task) {

        return TaskResponse.builder()
                .id(String.valueOf(task.getId()))
                .title(task.getTitle())
                .description(task.getDescription())
                .completed(task.isCompleted())
                .priority(String.valueOf(task.getPriority()))
                .dueDate(task.getDueDate())

                .roomId(String.valueOf(task.getRoom().getId()))

                .createdById(
                        task.getCreatedBy() != null
                                ? task.getCreatedBy().getId()
                                : null)

                .createdByUsername(
                        task.getCreatedBy() != null
                                ? task.getCreatedBy().getUsername()
                                : null)

                .assignedToId(
                        task.getAssignedTo() != null
                                ? task.getAssignedTo().getId()
                                : null)

                .assignedToUsername(
                        task.getAssignedTo() != null
                                ? task.getAssignedTo().getUsername()
                                : null)

                .createdAt(task.getCreatedAt())
                .build();
    }
}
