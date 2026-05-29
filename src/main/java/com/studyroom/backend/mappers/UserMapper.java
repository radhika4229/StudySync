package com.studyroom.backend.mappers;

import com.studyroom.backend.dto.response.BadgeResponse;
import com.studyroom.backend.dto.response.UserResponse;
import com.studyroom.backend.entity.Badge;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final BadgeRepository badgeRepository;

    public UserResponse toResponse(User user) {
        List<BadgeResponse> badges = badgeRepository.findByUser(user)
                .stream().map(this::toBadgeResponse).toList();

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole().name())
                .xpPoints(user.getXpPoints())
                .level(user.getLevel())
                .currentStreak(user.getCurrentStreak())
                .longestStreak(user.getLongestStreak())
                .totalStudyMinutes(user.getTotalStudyMinutes())
                .totalSessionsCompleted(user.getTotalSessionsCompleted())
                .badges(badges)
                .createdAt(user.getCreatedAt())
                .build();
    }

    private BadgeResponse toBadgeResponse(Badge badge) {
        return BadgeResponse.builder()
                .id(badge.getId())
                .name(badge.getName())
                .description(badge.getDescription())
                .icon(badge.getIcon())
                .type(badge.getType())
                .earnedAt(badge.getEarnedAt())
                .build();
    }
}

