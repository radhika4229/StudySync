package com.studyroom.backend.service;

import com.studyroom.backend.dto.response.DashboardStatsDTO;
import com.studyroom.backend.dto.response.SessionDTO;
import com.studyroom.backend.enums.SessionStatus;
import com.studyroom.backend.exception.ResourceNotFoundException;
import com.studyroom.backend.model.StudyRoom;
import com.studyroom.backend.model.StudySession;
import com.studyroom.backend.model.User;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.StudySessionRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final StudySessionRepository sessionRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;

    @Transactional
    public SessionDTO startSession(Long roomId, String email) {
        User user = getUserByEmail(email);

        // End any existing active session first
        sessionRepository.findByUserAndStatus(user, SessionStatus.ACTIVE)
                .ifPresent(s -> {
                    s.setStatus(SessionStatus.COMPLETED);
                    s.setEndTime(LocalDateTime.now());
                    s.setDurationMinutes(
                            ChronoUnit.MINUTES.between(s.getStartTime(), s.getEndTime()));
                    sessionRepository.save(s);
                });

        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        StudySession session = StudySession.builder()
                .user(user)
                .room(room)
                .startTime(LocalDateTime.now())
                .status(SessionStatus.ACTIVE)
                .build();

        session = sessionRepository.save(session);
        return mapToDTO(session);
    }

    @Transactional
    public SessionDTO endSession(Long sessionId, String email) {
        StudySession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        session.setEndTime(LocalDateTime.now());
        session.setStatus(SessionStatus.COMPLETED);
        session.setDurationMinutes(
                ChronoUnit.MINUTES.between(session.getStartTime(), session.getEndTime()));

        session = sessionRepository.save(session);
        return mapToDTO(session);
    }

    public List<SessionDTO> getUserSessionHistory(String email) {
        User user = getUserByEmail(email);
        return sessionRepository.findByUserOrderByCreatedAtDesc(user)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public DashboardStatsDTO getUserStats(String email) {
        User user = getUserByEmail(email);
        Long totalMinutes = sessionRepository.getTotalStudyMinutesByUser(user);
        Long completedSessions = sessionRepository.getCompletedSessionCountByUser(user);
        List<SessionDTO> recent = sessionRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream().limit(5).map(this::mapToDTO).collect(Collectors.toList());

        return DashboardStatsDTO.builder()
                .totalStudyMinutes(totalMinutes)
                .totalHours(totalMinutes / 60)
                .completedSessions(completedSessions)
                .roomsJoined((long) user.getRooms().size())
                .recentSessions(recent)
                .build();
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private SessionDTO mapToDTO(StudySession s) {
        return SessionDTO.builder()
                .id(s.getId())
                .roomId(s.getRoom().getId())
                .roomName(s.getRoom().getName())
                .startTime(s.getStartTime())
                .endTime(s.getEndTime())
                .durationMinutes(s.getDurationMinutes())
                .status(s.getStatus().name())
                .build();
    }
}
