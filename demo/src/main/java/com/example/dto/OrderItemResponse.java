package com.example.dto;

public record OrderItemResponse(
        Long id,
        String itemName,
        String itemImage,
        int quantity,
        double price,       // đơn giá tại thời điểm đặt
        double subtotal    // price * quantity
) {
}
