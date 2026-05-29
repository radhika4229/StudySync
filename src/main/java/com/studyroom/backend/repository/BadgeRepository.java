package com.studyroom.backend.repository;

import com.studyroom.backend.entity.Badge;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.BadgeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, String> {
    List<Badge> findByUser(User user);
    boolean existsByUserAndType(User user, BadgeType type);
}

