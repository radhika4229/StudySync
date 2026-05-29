package com.studyroom.backend.repository;

import com.studyroom.backend.entity.ChatMessage;
import com.studyroom.backend.entity.StudyRoom;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    List<ChatMessage> findByRoomOrderByCreatedAtDesc(StudyRoom room, Pageable pageable);
    List<ChatMessage> findByRoomOrderByCreatedAtAsc(StudyRoom room);
    long countByRoom(StudyRoom room);
}
