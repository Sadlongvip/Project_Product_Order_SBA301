package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.OrderItemResponse;
import com.example.dto.OrderResponse;
import com.example.model.Order;
import com.example.repository.IOrderRepository;

@Service
@Transactional
public class OrderService {

    private final IOrderRepository orderRepository;

    public OrderService(IOrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Lấy danh sách đơn hàng của 1 account
    public List<OrderResponse> getOrdersByAccountId(Long accountId) {
        List<Order> orders = orderRepository.findByAccountId(accountId);

        return orders.stream().map(order -> {
            List<OrderItemResponse> items = order.getOrderItems().stream().map(oi -> {
                double subtotal = oi.getPrice() * oi.getQuantity();
                return new OrderItemResponse(
                        oi.getId(),
                        oi.getItem().getName(),
                        oi.getItem().getImage(),
                        oi.getQuantity(),
                        oi.getPrice(),
                        subtotal
                );
            }).toList();

            return new OrderResponse(order.getId(), order.getTotalPrice(), items);
        }).toList();
    }
}

