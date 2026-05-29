package com.studyroom.backend.dto.response;

import com.studyroom.backend.enums.RoomStatus;
import com.studyroom.backend.enums.RoomVisibility;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RoomResponse {
    private String id;
    private String name;
    private String description;
    private String roomCode;
    private RoomStatus status;
    private RoomVisibility visibility;
    private String subject;
    private String topic;
    private int maxParticipants;
    private int currentParticipants;
    private boolean passwordProtected;
    private UserResponse owner;
    private List<UserResponse> members;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

