package com.studyroom.backend.entity;

import com.studyroom.backend.enums.RoomStatus;
import com.studyroom.backend.enums.RoomVisibility;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "study_rooms")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StudyRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(unique = true, nullable = false)
    private String roomCode;

    @Enumerated(EnumType.STRING)
    private RoomStatus status;

    @Enumerated(EnumType.STRING)
    private RoomVisibility visibility;

    private String subject;

    private String topic;

    private int maxParticipants = 10;

    private boolean passwordProtected = false;

    private String roomPassword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "room_members",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @Builder.Default
    private Set<User> members = new HashSet<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<StudySession> sessions = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Task> tasks = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<SharedNote> notes = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


}
