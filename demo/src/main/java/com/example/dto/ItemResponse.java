package com.example.dto;

public record ItemResponse(
        Long id,
        String name,
        String description,
        double price,
        String image,
        int stock,
        Long categoryId,
        String categoryName,
        Long shopId,
        String shopName
) {
}
