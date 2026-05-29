package com.studyroom.backend.repository;

import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.Task;
import com.studyroom.backend.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByRoomOrderByCreatedAtDesc(StudyRoom room);
    List<Task> findByRoomAndCompleted(StudyRoom room, boolean completed);
    List<Task> findByAssignedTo(User user);
}

