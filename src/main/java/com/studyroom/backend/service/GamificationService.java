package com.studyroom.backend.service;

import com.studyroom.backend.entity.Badge;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.BadgeType;
import com.studyroom.backend.repository.BadgeRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GamificationService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public void awardXP(User user, int xp, String reason) {
        user.setXpPoints(user.getXpPoints() + xp);
        user.setLevel(calculateLevel(user.getXpPoints()));
        userRepository.save(user);

        log.info("Awarded {} XP to {} for: {}", xp, user.getUsername(), reason);

        // Notify user
        messagingTemplate.convertAndSendToUser(
                user.getUsername(),
                "/queue/notifications",
                Map.of(
                        "type", "XP_EARNED",
                        "xp", xp,
                        "totalXp", user.getXpPoints(),
                        "reason", reason
                )
        );
    }

    @Transactional
    public void updateStudyStreak(User user) {
        LocalDate today = LocalDate.now();
        LocalDate lastStudy = user.getLastStudyDate() != null
                ? user.getLastStudyDate().toLocalDate() : null;

        if (lastStudy == null || lastStudy.isBefore(today.minusDays(1))) {
            user.setCurrentStreak(1);
        } else if (lastStudy.equals(today.minusDays(1))) {
            user.setCurrentStreak(user.getCurrentStreak() + 1);
        }
        // Same day — streak unchanged

        if (user.getCurrentStreak() > user.getLongestStreak()) {
            user.setLongestStreak(user.getCurrentStreak());
        }

        user.setLastStudyDate(LocalDateTime.now());
        userRepository.save(user);

        // Check streak badges
        if (user.getCurrentStreak() >= 7) {
            checkAndAwardBadge(user, BadgeType.STREAK_7);
        }
        if (user.getCurrentStreak() >= 30) {
            checkAndAwardBadge(user, BadgeType.STREAK_30);
        }

        // Night owl (after 10 PM) / Early Bird (before 7 AM)
        int hour = LocalDateTime.now().getHour();
        if (hour >= 22 || hour < 2) checkAndAwardBadge(user, BadgeType.NIGHT_OWL);
        if (hour >= 5 && hour < 7) checkAndAwardBadge(user, BadgeType.EARLY_BIRD);
    }

    @Transactional
    public void updateStudyStats(User user, long minutes) {
        user.setTotalStudyMinutes(user.getTotalStudyMinutes() + minutes);
        user.setTotalSessionsCompleted(user.getTotalSessionsCompleted() + 1);
        userRepository.save(user);

        // Session milestone badges
        if (user.getTotalSessionsCompleted() >= 10) {
            checkAndAwardBadge(user, BadgeType.SESSION_10);
        }
        if (user.getTotalSessionsCompleted() >= 50) {
            checkAndAwardBadge(user, BadgeType.SESSION_50);
        }
    }

    @Transactional
    public void checkAndAwardBadge(User user, BadgeType type) {
        if (badgeRepository.existsByUserAndType(user, type)) return;

        BadgeInfo info = getBadgeInfo(type);
        Badge badge = Badge.builder()
                .user(user)
                .name(info.name())
                .description(info.description())
                .icon(info.icon())
                .type(type)
                .build();
        badgeRepository.save(badge);

        log.info("Badge awarded: {} to {}", type, user.getUsername());

        messagingTemplate.convertAndSendToUser(
                user.getUsername(),
                "/queue/notifications",
                Map.of(
                        "type", "BADGE_EARNED",
                        "badge", Map.of(
                                "name", info.name(),
                                "description", info.description(),
                                "icon", info.icon()
                        )
                )
        );
    }

    private int calculateLevel(int xp) {
        if (xp < 100) return 1;
        if (xp < 300) return 2;
        if (xp < 600) return 3;
        if (xp < 1000) return 4;
        if (xp < 1500) return 5;
        return 5 + (xp - 1500) / 500;
    }

    private record BadgeInfo(String name, String description, String icon) {}

    private BadgeInfo getBadgeInfo(BadgeType type) {
        return switch (type) {
            case STREAK_7    -> new BadgeInfo("7 Day Warrior", "Studied 7 days in a row", "🔥");
            case STREAK_30   -> new BadgeInfo("Monthly Champion", "30-day study streak", "🏆");
            case NIGHT_OWL   -> new BadgeInfo("Night Owl", "Studied after 10 PM", "🦉");
            case EARLY_BIRD  -> new BadgeInfo("Early Bird", "Studied before 7 AM", "🌅");
            case SESSION_10  -> new BadgeInfo("Session Pro", "Completed 10 sessions", "⭐");
            case SESSION_50  -> new BadgeInfo("Study Master", "Completed 50 sessions", "💎");
            case SUBJECT_MASTER -> new BadgeInfo("Subject Master", "Mastered a subject", "🎓");
            case FIRST_ROOM  -> new BadgeInfo("Room Creator", "Created first study room", "🏠");
            case TEAM_PLAYER -> new BadgeInfo("Team Player", "Joined a study room", "🤝");
            case AI_EXPLORER -> new BadgeInfo("AI Explorer", "Used AI assistant", "🤖");
        };
    }
}

