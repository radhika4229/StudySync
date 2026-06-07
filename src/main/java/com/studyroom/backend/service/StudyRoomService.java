package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.CreateRoomRequest;
import com.studyroom.backend.dto.response.ChatMessageResponse;
import com.studyroom.backend.dto.response.RoomResponse;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.BadgeType;
import com.studyroom.backend.enums.MessageType;
import com.studyroom.backend.enums.RoomStatus;
import com.studyroom.backend.enums.RoomVisibility;
import com.studyroom.backend.mappers.RoomMapper;
import com.studyroom.backend.mappers.UserMapper;
import com.studyroom.backend.repository.ChatMessageRepository;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudyRoomService {

    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository messageRepository;
    private final NotificationService notificationService;
    private final GamificationService gamificationService;
    private final SimpMessagingTemplate messagingTemplate;
    private final UserMapper userMapper;
    private final RoomMapper roomMapper;

    @Transactional
    public RoomResponse createRoom(Long userId, CreateRoomRequest request) {

        User owner = findUser(userId);

        StudyRoom room = StudyRoom.builder()
                .name(request.getName())
                .description(request.getDescription())
                .roomCode(generateUniqueRoomCode())
                .subject(request.getSubject())
                .topic(request.getTopic())
                .visibility(request.getVisibility())
                .maxParticipants(request.getMaxParticipants())
                .passwordProtected(request.isPasswordProtected())
                .roomPassword(request.getRoomPassword())
                .status(RoomStatus.ACTIVE)
                .owner(owner)
                .build();

        room.getMembers().add(owner);

        room = roomRepository.save(room);

        log.info("Room created: {} by user: {}",
                room.getRoomCode(),
                owner.getUsername());

        gamificationService.awardXP(owner, 10, "Created a study room");
        gamificationService.checkAndAwardBadge(owner, BadgeType.FIRST_ROOM);

        return roomMapper.toResponse(room);
    }

    @Transactional
    public RoomResponse joinRoom(Long userId, String roomCode, String password) {

        User user = findUser(userId);

        StudyRoom room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        validateRoomCapacity(room);

        validateRoomPassword(room, password);

        boolean alreadyMember = room.getMembers().stream()
                .anyMatch(member -> member.getId().equals(userId));

        if (alreadyMember) {
            return roomMapper.toResponse(room);
        }

        if (room.getStatus() == RoomStatus.INACTIVE) {
            room.setStatus(RoomStatus.ACTIVE);
        }

        room.getMembers().add(user);

        room = roomRepository.save(room);

        broadcastSystemMessage(
                room,
                user.getUsername() + " joined the room 🎉"
        );

        gamificationService.awardXP(user, 5, "Joined a study room");
        gamificationService.checkAndAwardBadge(user, BadgeType.TEAM_PLAYER);

        return roomMapper.toResponse(room);
    }

    @Transactional
    public void leaveRoom(Long userId, String roomId) {

        User user = findUser(userId);

        StudyRoom room = findRoom(Long.valueOf(roomId));

        room.getMembers().remove(user);

        if (room.getMembers().isEmpty()) {
            room.setStatus(RoomStatus.INACTIVE);
        }

        roomRepository.save(room);

        broadcastSystemMessage(
                room,
                user.getUsername() + " left the room"
        );
    }

    private void validateRoomCapacity(StudyRoom room) {

        if (room.getMembers().size() >= room.getMaxParticipants()) {
            throw new RuntimeException("Room is full");
        }
    }

    private void validateRoomPassword(
            StudyRoom room,
            String password
    ) {

        if (!room.isPasswordProtected()) {
            return;
        }

        String roomPassword = room.getRoomPassword();

        if (roomPassword == null || roomPassword.isBlank()) {
            throw new RuntimeException("Room password is not configured");
        }

        if (!roomPassword.equals(password)) {
            throw new RuntimeException("Invalid room password");
        }
    }
    public List<RoomResponse> getPublicRooms() {
        return roomRepository.findByVisibilityAndStatus(
                        RoomVisibility.PUBLIC,RoomStatus.ACTIVE)
                .stream().map(roomMapper::toResponse).toList();
    }

    public List<RoomResponse> getUserRooms(Long userId) {
        User user = findUser(userId);
        List<StudyRoom> rooms = roomRepository.findRoomsByMemberId(String.valueOf(userId));
        return rooms.stream().map(roomMapper::toResponse).toList();
    }

    public RoomResponse getRoomById(Long userId, String roomId) {

        StudyRoom room = findRoom(Long.valueOf(roomId));

        if (
                room.getVisibility() == RoomVisibility.PRIVATE &&
                        room.getMembers().stream()
                                .noneMatch(member -> member.getId().equals(userId))
        ) {
            throw new RuntimeException("Access denied");
        }

        return roomMapper.toResponse(room);
    }

    public RoomResponse getRoomByCode(String roomCode) {
        StudyRoom room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return roomMapper.toResponse(room);
    }

    public List<RoomResponse> getRecommendedRooms(String subject) {
        return roomRepository.findBySubjectAndActive(subject)
                .stream().map(roomMapper::toResponse).toList();
    }

    private void broadcastSystemMessage(StudyRoom room, String text) {
        ChatMessageResponse message = ChatMessageResponse.builder()
                .roomId(String.valueOf(room.getId()))
                .content(text)
                .type(MessageType.SYSTEM)
                .build();
        messagingTemplate.convertAndSend("/topic/room/" + room.getId() + "/chat", message);
    }

    private String generateUniqueRoomCode() {
        String code;
        do {
            code = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (roomRepository.existsByRoomCode(code));
        return code;
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private StudyRoom findRoom(Long  id) {
        return roomRepository.findById(String.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
}
