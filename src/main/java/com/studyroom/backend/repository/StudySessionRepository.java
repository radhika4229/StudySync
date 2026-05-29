package com.studyroom.backend.repository;

import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.StudySession;
import com.studyroom.backend.enums.SessionStatus;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.*;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, String> {

    Optional<StudySession> findByRoomAndStatus(StudyRoom room, SessionStatus status);

    List<StudySession> findByRoomOrderByCreatedAtDesc(StudyRoom room);

    @Query("SELECT s FROM StudySession s JOIN s.participants p WHERE p.id = :userId ORDER BY s.createdAt DESC")
    List<StudySession> findSessionsByUserId(@Param("userId") String userId);

    @Query("SELECT SUM(s.durationMinutes) FROM StudySession s JOIN s.participants p WHERE p.id = :userId AND s.status = 'COMPLETED'")
    Long getTotalStudyMinutesByUser(@Param("userId") String userId);

    @Query("SELECT COUNT(s) FROM StudySession s JOIN s.participants p WHERE p.id = :userId AND s.status = 'COMPLETED'")
    Long getCompletedSessionCountByUser(@Param("userId") String userId);

    List<StudySession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
}

