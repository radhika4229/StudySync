package com.studyroom.backend.dto.response;


import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private String fullName;
    private String avatarUrl;
    private String role;
    private int xpPoints;
    private int level;
    private int currentStreak;
    private int longestStreak;
    private long totalStudyMinutes;
    private int totalSessionsCompleted;
    private List<BadgeResponse> badges;
    private LocalDateTime createdAt;
}

