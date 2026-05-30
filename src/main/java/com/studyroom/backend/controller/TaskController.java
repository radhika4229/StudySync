package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.CreateTaskRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.dto.response.TaskResponse;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.Task;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.mappers.TaskMapper;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.TaskRepository;
import com.studyroom.backend.repository.UserRepository;
import com.studyroom.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskMapper taskMapper;
    private final TaskRepository taskRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/rooms/{roomId}")
    @Transactional
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomId,
            @RequestBody CreateTaskRequest request) {

        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        User creator = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        User assignee = null;
        if (request.getAssignedToId() != null) {
            assignee = userRepository.findById(
                    Long.valueOf(request.getAssignedToId())
            ).orElse(null);
        }

        Task task = Task.builder()
                .room(room)
                .createdBy(creator)
                .assignedTo(assignee)
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .priority(request.getPriority())
                .build();

        task = taskRepository.save(task);

        TaskResponse response = taskMapper.toResponse(task);

        messagingTemplate.convertAndSend(
                "/topic/room/" + roomId + "/tasks",
                Map.of(
                        "type", "TASK_CREATED",
                        "task", response
                )
        );

        return ResponseEntity.ok(
                ApiResponse.success("Task created", response)
        );
    }

    @PutMapping("/{taskId}/complete")
    @Transactional
    public ResponseEntity<ApiResponse<TaskResponse>> completeTask(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(true);
        task = taskRepository.save(task);

        TaskResponse response = taskMapper.toResponse(task);

        messagingTemplate.convertAndSend(
                "/topic/room/" + task.getRoom().getId() + "/tasks",
                Map.of(
                        "type", "TASK_COMPLETED",
                        "task", response
                )
        );

        return ResponseEntity.ok(
                ApiResponse.success("Task completed", response)
        );
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getRoomTasks(
            @PathVariable String roomId) {

        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        List<TaskResponse> responses =
                taskRepository.findByRoomOrderByCreatedAtDesc(room)
                        .stream()
                        .map(taskMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(
                ApiResponse.success(responses)
        );
    }

    @DeleteMapping("/{taskId}")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteTask(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String taskId) {

        taskRepository.deleteById(taskId);

        return ResponseEntity.ok(
                ApiResponse.success("Task deleted", null)
        );
    }
}