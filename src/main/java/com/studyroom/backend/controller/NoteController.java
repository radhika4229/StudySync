package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.CreateNoteRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.entity.SharedNote;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.SharedNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final SharedNoteService noteService;

    @PostMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<SharedNote>> createNote(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String roomId,
            @RequestBody CreateNoteRequest request) {
        return ResponseEntity.ok(ApiResponse.success(
                "Note created", noteService.createNote(user.getId(), roomId, request)));
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<ApiResponse<SharedNote>> updateNote(
            @AuthenticationPrincipal UserPrincipal user,
            @PathVariable String noteId,
            @RequestBody String content) {
        return ResponseEntity.ok(ApiResponse.success(
                noteService.updateNote(user.getId(), noteId, content)));
    }

    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<ApiResponse<List<SharedNote>>> getRoomNotes(
            @PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.success(noteService.getRoomNotes(roomId)));
    }

    @GetMapping("/{noteId}/export/pdf")
    public ResponseEntity<byte[]> exportPdf(@PathVariable String noteId) {
        byte[] pdf = noteService.exportNoteToPDF(noteId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"note-" + noteId + ".pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}

