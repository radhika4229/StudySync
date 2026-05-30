package com.studyroom.backend.dto.response;

import com.studyroom.backend.enums.BadgeType;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BadgeResponse {
    private Long  id;
    private String name;
    private String description;
    private String icon;
    private BadgeType type;
    private LocalDateTime earnedAt;
}

