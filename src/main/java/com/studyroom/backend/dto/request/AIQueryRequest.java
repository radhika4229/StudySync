package com.studyroom.backend.dto.request;

import com.studyroom.backend.enums.AIQueryType;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AIQueryRequest {
    @NotBlank
    private String query;

    private String context; // optional room context

    @NotNull
    private AIQueryType type;


}

