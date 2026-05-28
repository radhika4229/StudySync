package com.studyroom.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStatsDTO {
    private Long totalStudyMinutes;
    private Long totalHours;
    private Long completedSessions;
    private Long roomsJoined;
    private List<SessionDTO> recentSessions;
}