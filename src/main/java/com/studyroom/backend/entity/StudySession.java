package com.studyroom.backend.entity;
import com.studyroom.backend.enums.SessionStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "study_sessions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private StudyRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "started_by", nullable = false)
    private User startedBy;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long durationMinutes = 0;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "session_participants",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();

    @Column(length = 2000)
    private String notes;

    private int focusScore = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;


}


