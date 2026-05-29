package com.studyroom.backend.service;

import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.StudySession;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.SessionStatus;
import com.studyroom.backend.repository.ChatMessageRepository;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.StudySessionRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final StudySessionRepository sessionRepository;
    private final ChatMessageRepository messageRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;

    public Map<String, Object> getUserAnalytics(String userId) {
        Long totalMinutes = sessionRepository.getTotalStudyMinutesByUser(userId);
        Long totalSessions = sessionRepository.getCompletedSessionCountByUser(userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> analytics = new LinkedHashMap<>();
        analytics.put("totalStudyMinutes", totalMinutes != null ? totalMinutes : 0);
        analytics.put("totalStudyHours", totalMinutes != null ? totalMinutes / 60.0 : 0);
        analytics.put("totalSessions", totalSessions != null ? totalSessions : 0);
        analytics.put("currentStreak", user.getCurrentStreak());
        analytics.put("longestStreak", user.getLongestStreak());
        analytics.put("xpPoints", user.getXpPoints());
        analytics.put("level", user.getLevel());
        analytics.put("totalRoomsJoined", user.getJoinedRooms().size());

        return analytics;
    }

    public Map<String, Object> getRoomAnalytics(String roomId) {
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        List<StudySession> sessions = sessionRepository.findByRoomOrderByCreatedAtDesc(room);
        long totalMessages = messageRepository.countByRoom(room);

        long totalStudyMinutes = sessions.stream()
                .filter(s -> s.getStatus() == SessionStatus.COMPLETED)
                .mapToLong(StudySession::getDurationMinutes)
                .sum();

        double avgDuration = sessions.stream()
                .filter(s -> s.getStatus() == SessionStatus.COMPLETED)
                .mapToLong(StudySession::getDurationMinutes)
                .average().orElse(0);

        Map<String, Object> analytics = new LinkedHashMap<>();
        analytics.put("roomName", room.getName());
        analytics.put("subject", room.getSubject());
        analytics.put("totalMembers", room.getMembers().size());
        analytics.put("totalSessions", sessions.size());
        analytics.put("totalStudyMinutes", totalStudyMinutes);
        analytics.put("averageSessionDuration", avgDuration);
        analytics.put("totalMessages", totalMessages);
        analytics.put("createdAt", room.getCreatedAt());

        return analytics;
    }

    public List<Map<String, Object>> getLeaderboard(String type, int limit) {
        org.springframework.data.domain.Pageable pageable =
                org.springframework.data.domain.PageRequest.of(0, limit);

        List<User> users = "streak".equals(type)
                ? userRepository.findTopByOrderByCurrentStreakDesc(pageable)
                : userRepository.findTopByOrderByXpPointsDesc(pageable);

        List<Map<String, Object>> leaderboard = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            User u = users.get(i);
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("rank", i + 1);
            entry.put("userId", u.getId());
            entry.put("username", u.getUsername());
            entry.put("fullName", u.getFullName());
            entry.put("avatarUrl", u.getAvatarUrl());
            entry.put("xpPoints", u.getXpPoints());
            entry.put("level", u.getLevel());
            entry.put("currentStreak", u.getCurrentStreak());
            entry.put("totalStudyMinutes", u.getTotalStudyMinutes());
            leaderboard.add(entry);
        }
        return leaderboard;
    }
}

