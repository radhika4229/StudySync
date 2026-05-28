package com.studyroom.backend.repository;

import com.studyroom.backend.model.ChatMessage;
import com.studyroom.backend.model.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findTop50ByRoomOrderByCreatedAtAsc(StudyRoom room);
}