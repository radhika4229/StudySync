package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.CreateRoomRequest;
import com.studyroom.backend.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(
            @Valid @RequestBody CreateRoomRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                roomService.createRoom(request, userDetails.getUsername()));
    }

    @PostMapping("/join/{inviteCode}")
    public ResponseEntity<RoomDTO> joinRoom(
            @PathVariable String inviteCode,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                roomService.joinByInviteCode(inviteCode, userDetails.getUsername()));
    }

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getMyRooms(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                roomService.getRoomsForUser(userDetails.getUsername()));
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDTO> getRoomById(@PathVariable Long roomId) {
        return ResponseEntity.ok(roomService.getRoomById(roomId));
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Void> deleteRoom(
            @PathVariable Long roomId,
            @AuthenticationPrincipal UserDetails userDetails) {
        roomService.deleteRoom(roomId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}