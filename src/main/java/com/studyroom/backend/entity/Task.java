package com.studyroom.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.studyroom.backend.enums.TaskPriority;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    @JsonIgnore
    private StudyRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    @JsonIgnore
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @Column(nullable = false)
    private String title;

    private String description;

    private boolean completed = false;

    private LocalDateTime dueDate;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    @CreationTimestamp
    private LocalDateTime createdAt;


}

