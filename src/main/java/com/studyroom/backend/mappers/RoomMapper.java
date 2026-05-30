package com.studyroom.backend.mappers;

import com.studyroom.backend.dto.response.RoomResponse;
import com.studyroom.backend.entity.StudyRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoomMapper {

    private final UserMapper userMapper;

    public RoomResponse toResponse(StudyRoom room) {
        return RoomResponse.builder()
                .id(String.valueOf(room.getId()))
                .name(room.getName())
                .description(room.getDescription())
                .roomCode(room.getRoomCode())
                .status(room.getStatus())
                .visibility(room.getVisibility())
                .subject(room.getSubject())
                .topic(room.getTopic())
                .maxParticipants(room.getMaxParticipants())
                .currentParticipants(room.getMembers().size())
                .passwordProtected(room.isPasswordProtected())
                .owner(userMapper.toResponse(room.getOwner()))
                .members(room.getMembers().stream().map(userMapper::toResponse).toList())
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .build();
    }
}

