package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.CreateRoomRequest;
import com.studyroom.backend.exception.ResourceNotFoundException;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;

    @Transactional
    public RoomDTO createRoom(CreateRoomRequest request, String email) {
        User owner = getUserByEmail(email);

        StudyRoom room = StudyRoom.builder()
                .name(request.getName())
                .description(request.getDescription())
                .subject(request.getSubject())
                .inviteCode(generateInviteCode())
                .owner(owner)
                .build();

        room.getParticipants().add(owner);
        room = roomRepository.save(room);
        return mapToDTO(room);
    }

    @Transactional
    public RoomDTO joinByInviteCode(String inviteCode, String email) {
        User user = getUserByEmail(email);
        StudyRoom room = roomRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid invite code"));

        room.getParticipants().add(user);
        roomRepository.save(room);
        return mapToDTO(room);
    }

    public List<RoomDTO> getRoomsForUser(String email) {
        User user = getUserByEmail(email);
        return roomRepository.findAllByUser(user).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public RoomDTO getRoomById(Long roomId) {
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return mapToDTO(room);
    }

    @Transactional
    public void deleteRoom(Long roomId, String email) {
        User user = getUserByEmail(email);
        StudyRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        if (!room.getOwner().getId().equals(user.getId())) {
            throw new RuntimeException("Only owner can delete room");
        }
        roomRepository.delete(room);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private String generateInviteCode() {
        String code;
        do {
            code = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (roomRepository.findByInviteCode(code).isPresent());
        return code;
    }

    public RoomDTO mapToDTO(StudyRoom room) {
        Set<UserDTO> participantDTOs = room.getParticipants().stream()
                .map(u -> UserDTO.builder()
                        .id(u.getId())
                        .username(u.getUsername())
                        .email(u.getEmail())
                        .avatarColor(u.getAvatarColor())
                        .build())
                .collect(Collectors.toSet());

        return RoomDTO.builder()
                .id(room.getId())
                .name(room.getName())
                .description(room.getDescription())
                .subject(room.getSubject())
                .inviteCode(room.getInviteCode())
                .owner(UserDTO.builder()
                        .id(room.getOwner().getId())
                        .username(room.getOwner().getUsername())
                        .email(room.getOwner().getEmail())
                        .avatarColor(room.getOwner().getAvatarColor())
                        .build())
                .participants(participantDTOs)
                .participantCount(participantDTOs.size())
                .createdAt(room.getCreatedAt())
                .build();
    }
}
