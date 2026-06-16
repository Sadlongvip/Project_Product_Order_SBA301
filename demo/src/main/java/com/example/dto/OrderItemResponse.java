package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private Long id;
    private String itemName;
    private String itemImage;
    private int quantity;
    private double price;       // đơn giá tại thời điểm đặt
    private double subtotal;    // price * quantity
}
