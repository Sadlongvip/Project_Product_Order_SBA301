package com.example.dto;

import java.util.List;

public record OrderResponse(
        Long id,
        Double totalPrice,
        List<OrderItemResponse> orderItems
) {
}
