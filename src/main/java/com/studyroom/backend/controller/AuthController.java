package com.studyroom.backend.controller;

import com.studyroom.backend.dto.request.LoginRequest;
import com.studyroom.backend.dto.request.RegisterRequest;
import com.studyroom.backend.dto.response.ApiResponse;
import com.studyroom.backend.dto.response.AuthResponse;
import com.studyroom.backend.dto.response.UserResponse;
import com.studyroom.backend.security.UserPrincipal;
import com.studyroom.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @RequestParam String refreshToken) {
        System.out.println("CONTROLLER TOKEN = [" + refreshToken + "]");
        refreshToken = refreshToken.trim();
        AuthResponse response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @AuthenticationPrincipal UserPrincipal user) {
        authService.logout(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            @AuthenticationPrincipal UserPrincipal principal) {

        return ResponseEntity.ok(ApiResponse.success(null));

    }
}

