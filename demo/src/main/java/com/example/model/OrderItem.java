package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "OrderItem")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 1")
    private int quantity;

    @Column(nullable = false, columnDefinition = "DECIMAL(10,2) DEFAULT 0.00")
    private double price;

    //==================== Association ====================
    @JsonIgnoreProperties("orderItems")
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @JsonIgnoreProperties({"orderItems", "cartItems", "category", "shop"})
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
}
