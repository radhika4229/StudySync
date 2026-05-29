package com.studyroom.backend.repository;

import com.studyroom.backend.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    @Query("SELECT u FROM User u ORDER BY u.xpPoints DESC")
    List<User> findTopByOrderByXpPointsDesc(org.springframework.data.domain.Pageable pageable);

    @Query("SELECT u FROM User u ORDER BY u.currentStreak DESC")
    List<User> findTopByOrderByCurrentStreakDesc(org.springframework.data.domain.Pageable pageable);
}
