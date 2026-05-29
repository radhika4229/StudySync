package com.studyroom.backend.service;

import com.studyroom.backend.dto.request.CreateRoomRequest;
import com.studyroom.backend.dto.response.ChatMessageResponse;
import com.studyroom.backend.dto.response.RoomResponse;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.enums.BadgeType;
import com.studyroom.backend.enums.MessageType;
import com.studyroom.backend.enums.RoomStatus;
import com.studyroom.backend.repository.ChatMessageRepository;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public RoomResponse createRoom(String userId, CreateRoomRequest request) {
        User owner = findUser(userId);

        String roomCode = generateUniqueRoomCode();

        StudyRoom room = StudyRoom.builder()
                .name(request.getName())
                .description(request.getDescription())
                .roomCode(roomCode)
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

        // Award XP for creating a room
        gamificationService.awardXP(owner, 10, "Created a study room");
        gamificationService.checkAndAwardBadge(owner, BadgeType.FIRST_ROOM);

        log.info("Room created: {} by user: {}", room.getRoomCode(), owner.getUsername());
        return roomMapper.toResponse(room);
    }

    @Transactional
    public RoomResponse joinRoom(String userId, String roomCode, String password) {
        User user = findUser(userId);
        StudyRoom room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getMembers().size() >= room.getMaxParticipants()) {
            throw new RuntimeException("Room is full");
        }

        if (room.isPasswordProtected() &&
                !room.getRoomPassword().equals(password)) {
            throw new RuntimeException("Invalid room password");
        }

        room.getMembers().add(user);
        room = roomRepository.save(room);

        // Notify room members
        broadcastSystemMessage(room, user.getUsername() + " joined the room 🎉");

        // Award XP
        gamificationService.awardXP(user, 5, "Joined a study room");
        gamificationService.checkAndAwardBadge(user, BadgeType.TEAM_PLAYER);

        return roomMapper.toResponse(room);
    }

    @Transactional
    public void leaveRoom(String userId, String roomId) {
        User user = findUser(userId);
        StudyRoom room = findRoom(roomId);

        room.getMembers().remove(user);
        roomRepository.save(room);

        broadcastSystemMessage(room, user.getUsername() + " left the room");
    }

    public List<RoomResponse> getPublicRooms() {
        return roomRepository.findByVisibilityAndStatus(
                        StudyRoom.RoomVisibility.PUBLIC, StudyRoom.RoomStatus.ACTIVE)
                .stream().map(roomMapper::toResponse).toList();
    }

    public List<RoomResponse> getUserRooms(String userId) {
        User user = findUser(userId);
        List<StudyRoom> rooms = roomRepository.findRoomsByMemberId(userId);
        return rooms.stream().map(roomMapper::toResponse).toList();
    }

    public RoomResponse getRoomById(String roomId) {
        return roomMapper.toResponse(findRoom(roomId));
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
                .roomId(room.getId())
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

    private User findUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private StudyRoom findRoom(String roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
}
