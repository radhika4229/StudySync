package com.studyroom.backend.dto.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRoomRequest {
    @NotBlank
    private String name;
    private String description;
    private String subject;
}
