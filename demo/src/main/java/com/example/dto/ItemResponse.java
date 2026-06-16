package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponse {

    private Long id;
    private String name;
    private String description;
    private double price;
    private String image;
    private int stock;
    private Long categoryId;
    private String categoryName;
}
