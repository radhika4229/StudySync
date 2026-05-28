package com.studyroom.backend.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDTO {
    private Long id;
    private String name;
    private String description;
    private String subject;
    private String inviteCode;
    private UserDTO owner;
    private Set<UserDTO> participants;
    private int participantCount;
    private LocalDateTime createdAt;
}