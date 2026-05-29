package com.studyroom.backend.repository;

import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.RoomStatus;
import com.studyroom.backend.enums.RoomVisibility;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, String> {

    Optional<StudyRoom> findByRoomCode(String roomCode);

    List<StudyRoom> findByOwner(User owner);

    List<StudyRoom> findByVisibilityAndStatus(
            RoomVisibility visibility, RoomStatus status);

    @Query("SELECT r FROM StudyRoom r JOIN r.members m WHERE m.id = :userId")
    List<StudyRoom> findRoomsByMemberId(@Param("userId") String userId);

    @Query("SELECT r FROM StudyRoom r WHERE r.subject = :subject AND r.status = 'ACTIVE' AND r.visibility = 'PUBLIC'")
    List<StudyRoom> findBySubjectAndActive(@Param("subject") String subject);

    boolean existsByRoomCode(String roomCode);
}

