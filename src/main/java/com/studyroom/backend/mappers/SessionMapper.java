package com.studyroom.backend.mappers;
import com.studyroom.backend.dto.response.SessionResponse;
import com.studyroom.backend.entity.StudySession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SessionMapper {

    private final UserMapper userMapper;

    public SessionResponse toResponse(StudySession session) {
        return SessionResponse.builder()
                .id(session.getId())
                .roomId(session.getRoom().getId())
                .startedBy(userMapper.toResponse(session.getStartedBy()))
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .durationMinutes(session.getDurationMinutes())
                .status(session.getStatus())
                .participants(session.getParticipants().stream()
                        .map(userMapper::toResponse).toList())
                .notes(session.getNotes())
                .focusScore(session.getFocusScore())
                .build();
    }
}

