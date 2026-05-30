package com.studyroom.backend.service;

import com.studyroom.backend.entity.Notification;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.NotificationType;
import com.studyroom.backend.repository.NotificationRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public void createNotification(User user, String title, String message,
                                   NotificationType type, String referenceId) {
        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .referenceId(referenceId)
                .build();
        notification = notificationRepository.save(notification);

        // Real-time push
        messagingTemplate.convertAndSendToUser(
                user.getUsername(), "/queue/notifications",
                Map.of("type", "NOTIFICATION", "notification", Map.of(
                        "id", notification.getId(),
                        "title", title,
                        "message", message,
                        "notificationType", type.name()
                ))
        );
    }

    public List<Notification> getUserNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional
    public void markAsRead(String userId) {
        notificationRepository.findById(userId).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }

    @Transactional
    public void markAllAsRead(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Notification> unread = notificationRepository.findByUserAndReadFalse(user);
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    public long getUnreadCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.countByUserAndReadFalse(user);
    }
}

