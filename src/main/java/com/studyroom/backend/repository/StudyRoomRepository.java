package com.studyroom.backend.repository;


import com.studyroom.backend.model.StudyRoom;
import com.studyroom.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    Optional<StudyRoom> findByInviteCode(String inviteCode);

    @Query("SELECT r FROM StudyRoom r WHERE r.owner = :user OR :user MEMBER OF r.participants")
    List<StudyRoom> findAllByUser(@Param("user") User user);
}
