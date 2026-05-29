package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.CreateRoomRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.dto.response.RoomResponse;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.StudyRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final StudyRoomService roomService;

    @PostMapping
    public ResponseEntity<ApiResponse<RoomResponse>> createRoom(
            @AuthenticationPrincipal UserPrincipal user,
            @Valid @RequestBody CreateRoomRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                "Room created", roomService.createRoom(user.getId(), request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getPublicRooms() {
        return ResponseEntity.ok(ApiResponse.success(roomService.getPublicRooms()));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getMyRooms(
            @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(ApiResponse.success(roomService.getUserRooms(user.getId())));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<ApiResponse<RoomResponse>> getRoom(@PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(roomService.getRoomById(roomId)));
    }

    @GetMapping("/code/{roomCode}")
    public ResponseEntity<ApiResponse<RoomResponse>> getRoomByCode(@PathVariable String roomCode) {
        return ResponseEntity.ok(ApiResponse.success(roomService.getRoomByCode(roomCode)));
    }

    @PostMapping("/{roomCode}/join")
    public ResponseEntity<ApiResponse<RoomResponse>> joinRoom(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomCode,
            @RequestParam(required = false) String password) {
        return ResponseEntity.ok(ApiResponse.success(
                "Joined room", roomService.joinRoom(user.getId(), roomCode, password)));
    }

    @DeleteMapping("/{roomId}/leave")
    public ResponseEntity<ApiResponse<Void>> leaveRoom(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomId) {
        roomService.leaveRoom(user.getId(), roomId);
        return ResponseEntity.ok(ApiResponse.success("Left room", null));
    }

    @GetMapping("/recommend")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getRecommended(
            @RequestParam String subject) {
        return ResponseEntity.ok(ApiResponse.success(roomService.getRecommendedRooms(subject)));
    }
}
