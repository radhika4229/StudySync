package com.studyroom.backend.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.studyroom.backend.dto.request.CreateNoteRequest;
import com.studyroom.backend.entity.SharedNote;
import com.studyroom.backend.entity.StudyRoom;
import com.studyroom.backend.entity.User;
import com.studyroom.backend.repository.SharedNoteRepository;
import com.studyroom.backend.repository.StudyRoomRepository;
import com.studyroom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SharedNoteService {

    private final SharedNoteRepository noteRepository;
    private final StudyRoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public SharedNote createNote(String userId, String roomId, CreateNoteRequest request) {
        User user = findUser(userId);
        StudyRoom room = findRoom(roomId);

        SharedNote note = SharedNote.builder()
                .room(room)
                .createdBy(user)
                .title(request.getTitle())
                .content(request.getContent())
                .lastEditedBy(user)
                .version("1.0")
                .build();

        note = noteRepository.save(note);

        messagingTemplate.convertAndSend(
                "/topic/room/" + roomId + "/notes",
                Map.of("type", "NOTE_CREATED", "noteId", note.getId(), "title", note.getTitle())
        );

        return note;
    }

    @Transactional
    public SharedNote updateNote(String userId, String noteId, String content) {
        User user = findUser(userId);
        SharedNote note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setContent(content);
        note.setLastEditedBy(user);
        note = noteRepository.save(note);

        // Broadcast live update
        messagingTemplate.convertAndSend(
                "/topic/room/" + note.getRoom().getId() + "/notes",
                Map.of("type", "NOTE_UPDATED", "noteId", noteId, "content", content,
                        "editedBy", user.getUsername())
        );

        return note;
    }

    public List<SharedNote> getRoomNotes(String roomId) {
        StudyRoom room = findRoom(roomId);
        return noteRepository.findByRoomOrderByUpdatedAtDesc(room);
    }

    public byte[] exportNoteToPDF(String noteId) {
        SharedNote note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font bodyFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);

            document.add(new Paragraph(note.getTitle(), titleFont));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Room: " + note.getRoom().getName(), bodyFont));
            document.add(new Paragraph("Created by: " + note.getCreatedBy().getUsername(), bodyFont));
            document.add(new Paragraph("\n"));
            document.add(new Paragraph(note.getContent() != null ? note.getContent() : "", bodyFont));

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

    private User findUser(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private StudyRoom findRoom(String id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
}

