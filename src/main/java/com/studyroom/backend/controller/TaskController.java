package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.CreateTaskRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.Task;
import com.studyroom.backend.entity.User;
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

    private final TaskRepository taskRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/rooms/{roomId}")
    @Transactional
    public ResponseEntity<ApiResponse<Task>> createTask(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomId,
            @RequestBody CreateTaskRequest request) {

        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        User creator = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        User assignee = null;
        if (request.getAssignedToId() != null) {
            assignee = userRepository.findById(Long.valueOf(request.getAssignedToId())).orElse(null);
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

        messagingTemplate.convertAndSend(
                "/topic/room/" + roomId + "/tasks",
                Map.of("type", "TASK_CREATED", "task", task));

        return ResponseEntity.ok(ApiResponse.success("Task created", task));
    }

    @PutMapping("/{taskId}/complete")
    @Transactional
    public ResponseEntity<ApiResponse<Task>> completeTask(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(true);
        task = taskRepository.save(task);

        messagingTemplate.convertAndSend(
                "/topic/room/" + task.getRoom().getId() + "/tasks",
                Map.of("type", "TASK_COMPLETED", "taskId", taskId));

        return ResponseEntity.ok(ApiResponse.success("Task completed", task));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<List<Task>>> getRoomTasks(@PathVariable String roomId) {
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return ResponseEntity.ok(ApiResponse.success(
                taskRepository.findByRoomOrderByCreatedAtDesc(room)));
    }

    @DeleteMapping("/{taskId}")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteTask(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String taskId) {
        taskRepository.deleteById(taskId);
        return ResponseEntity.ok(ApiResponse.success("Task deleted", null));
    }
}

