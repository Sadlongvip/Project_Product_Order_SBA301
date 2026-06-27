package com.example.dto;

public record RegisterRequest(
        String username,
        String email,
        String password,
        String phoneNumber
) {
}
