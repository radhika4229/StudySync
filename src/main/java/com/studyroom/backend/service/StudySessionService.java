package com.studyroom.backend.service;

import com.studyroom.backend.dto.response.SessionResponse;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.StudySession;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.NotificationType;
import com.studyroom.backend.enums.SessionStatus;
import com.studyroom.backend.mappers.SessionMapper;
import com.studyroom.backend.mappers.UserMapper;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.StudySessionRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudySessionService {

    private final StudySessionRepository sessionRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;
    private final GamificationService gamificationService;
    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate;
    private final SessionMapper sessionMapper;
    private final UserMapper userMapper;

    @Transactional
    public SessionResponse startSession(long userId, long roomId) {
        User user = findUser(userId);
        StudyRoom room = findRoom(roomId);

        // Check if session already active
        sessionRepository.findByRoomAndStatus(room, SessionStatus.ACTIVE)
                .ifPresent(s -> { throw new RuntimeException("Session already active in this room"); });

        StudySession session = StudySession.builder()
                .room(room)
                .startedBy(user)
                .startTime(LocalDateTime.now())
                .status(SessionStatus.ACTIVE)
                .build();
        session.getParticipants().add(user);
        session = sessionRepository.save(session);

        // Broadcast session start
        messagingTemplate.convertAndSend(
                "/topic/room/" + roomId + "/session",
                Map.of("type", "SESSION_STARTED", "session", sessionMapper.toResponse(session))
        );

        // Notify all room members
        room.getMembers().forEach(member -> {
            if (!member.getId().equals(userId)) {
                notificationService.createNotification(
                        member, "Session Started! 🚀",
                        user.getUsername() + " started a session in " + room.getName(),
                        NotificationType.SESSION_START,  String.valueOf(roomId)
                );
            }
        });

        return sessionMapper.toResponse(session);
    }

    @Transactional
    public SessionResponse endSession(Long userId, String sessionId, String notes) {
        User user = findUser(userId);

        StudySession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (!session.getStartedBy().getId().equals(userId)) {
            throw new RuntimeException("Only session starter can end the session");
        }

        session.setEndTime(LocalDateTime.now());
        session.setStatus(SessionStatus.COMPLETED);
        session.setNotes(notes);

        long minutes = Duration.between(
                session.getStartTime(),
                session.getEndTime()
        ).toMinutes();

        session.setDurationMinutes(minutes);

        session = sessionRepository.save(session);

        for (User participant : session.getParticipants()) {
            int xpEarned = (int) (minutes / 10) * 5 + 20;
            gamificationService.awardXP(
                    participant,
                    xpEarned,
                    "Completed study session"
            );
            gamificationService.updateStudyStreak(participant);
            gamificationService.updateStudyStats(participant, minutes);
        }

        messagingTemplate.convertAndSend(
                "/topic/room/" + session.getRoom().getId() + "/session",
                Map.of(
                        "type", "SESSION_ENDED",
                        "session", sessionMapper.toResponse(session)
                )
        );

        return sessionMapper.toResponse(session);
    }

    @Transactional
    public SessionResponse joinSession(Long userId, String sessionId) {
        User user = findUser(userId);

        StudySession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.getParticipants().add(user);
        session = sessionRepository.save(session);

        messagingTemplate.convertAndSend(
                "/topic/room/" + session.getRoom().getId() + "/session",
                Map.of(
                        "type", "USER_JOINED_SESSION",
                        "userId", userId,
                        "username", user.getUsername()
                )
        );

        return sessionMapper.toResponse(session);
    }
    public Optional<SessionResponse> getActiveSession(Long roomId) {
        StudyRoom room = findRoom(roomId);
        return sessionRepository.findByRoomAndStatus(room, SessionStatus.ACTIVE)
                .map(sessionMapper::toResponse);
    }

    public List<SessionResponse> getRoomSessions(String roomId) {
        StudyRoom room = findRoom(Long.valueOf(roomId));
        return sessionRepository.findByRoomOrderByCreatedAtDesc(room)
                .stream().map(sessionMapper::toResponse).toList();
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private StudyRoom findRoom(Long id) {
        return roomRepository.findById(String.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
}
