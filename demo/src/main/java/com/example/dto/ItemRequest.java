package com.example.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @Min(value = 0, message = "Price must be >= 0")
    private double price;

    @NotBlank(message = "Image is required")
    private String image;

    @Min(value = 0, message = "Stock must be >= 0")
    private int stock;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}
