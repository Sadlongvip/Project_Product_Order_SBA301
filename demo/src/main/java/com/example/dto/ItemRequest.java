package com.example.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ItemRequest(
        @NotBlank(message = "Name is required") String name,
        @NotBlank(message = "Description is required") String description,
        @Min(value = 0, message = "Price must be >= 0") double price,
        @NotBlank(message = "Image is required") String image,
        @Min(value = 0, message = "Stock must be >= 0") int stock,
        @NotNull(message = "Category ID is required") Long categoryId,
        Long shopId
) {
}
