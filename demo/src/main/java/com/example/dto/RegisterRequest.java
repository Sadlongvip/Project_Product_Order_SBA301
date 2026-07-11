package com.example.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
                @NotBlank(message = "Username không được để trống")
                String username,
                @NotBlank(message = "Email không được để trống")
                @Email(message = "Email không hợp lệ")
                String email,
                @NotBlank(message = "Mật khẩu không được để trống")
                String password,
                @NotBlank(message = "Số điện thoại không được để trống")
                String phoneNumber,
                @NotBlank(message = "Địa chỉ không được để trống")
                String address) {
}
