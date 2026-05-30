package com.studyroom.backend.entity;
import com.studyroom.backend.enums.MessageType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private StudyRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @Column(nullable = false, length = 5000)
    private String content;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    private boolean isAiResponse = false;

    private String replyToMessageId;

    @CreationTimestamp
    private LocalDateTime createdAt;


}
