package com.studyroom.backend.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CreateNoteRequest {
    @NotBlank
    private String title;
    private String content;
}

