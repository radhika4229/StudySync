package com.studyroom.backend.dto.response;

import com.studyroom.backend.enums.SessionStatus;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SessionResponse {
    private Long id;
    private String roomId;
    private UserResponse startedBy;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long durationMinutes;
    private SessionStatus status;
    private List<UserResponse> participants;
    private String notes;
    private int focusScore;
}
