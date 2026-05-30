package com.studyroom.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIQueryRequest {

      @NotBlank(message = "Question must not be blank")
    @Size(max = 2000, message = "Question must not exceed 2000 characters")
    private String question;

   @Size(max = 50, message = "Query type must not exceed 50 characters")
    private String queryType;
}
