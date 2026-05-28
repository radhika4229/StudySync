package com.studyroom.backend.repository;

import com.studyroom.backend.enums.SessionStatus;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.StudySession;
import com.studyroom.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudySessionRepository extends JpaRepository<StudySession, Long> {
    List<StudySession> findByUserOrderByCreatedAtDesc(User user);
    List<StudySession> findByRoomOrderByCreatedAtDesc(StudyRoom room);
    Optional<StudySession> findByUserAndStatus(User user, SessionStatus status);

    @Query("SELECT COALESCE(SUM(s.durationMinutes), 0) FROM StudySession s WHERE s.user = :user AND s.status = 'COMPLETED'")
    Long getTotalStudyMinutesByUser(@Param("user") User user);

    @Query("SELECT COUNT(s) FROM StudySession s WHERE s.user = :user AND s.status = 'COMPLETED'")
    Long getCompletedSessionCountByUser(@Param("user") User user);
}
