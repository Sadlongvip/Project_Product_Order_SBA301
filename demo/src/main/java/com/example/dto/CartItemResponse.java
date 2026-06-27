package com.example.dto;

public record CartItemResponse(
        Long id,
        int quantity,
        double price,
        ItemResponse item
) {
}
