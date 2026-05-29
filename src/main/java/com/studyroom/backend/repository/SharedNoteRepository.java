package com.studyroom.backend.repository;

import com.studyroom.backend.entity.SharedNote;
import com.studyroom.backend.entity.StudyRoom;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SharedNoteRepository extends JpaRepository<SharedNote, String> {
    List<SharedNote> findByRoomOrderByUpdatedAtDesc(StudyRoom room);
}

