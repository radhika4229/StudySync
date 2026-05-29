package com.studyroom.backend.dto.request;

import com.studyroom.backend.enums.RoomVisibility;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CreateRoomRequest {
    @NotBlank @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @NotBlank
    private String subject;

    private String topic;

    private RoomVisibility visibility = RoomVisibility.PUBLIC;

    private int maxParticipants = 10;

    private boolean passwordProtected = false;

    private String roomPassword;
}

