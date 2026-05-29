package com.studyroom.backend.repository;

import com.studyroom.backend.entity.Notification;
import com.studyroom.backend.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    List<Notification> findByUserAndReadFalse(User user);
    long countByUserAndReadFalse(User user);
}
