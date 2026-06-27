package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
    public List<Order> getOrdersByAccountId(Long accountId) {
        List<Order> orders = orderRepository.findByAccountId(accountId);
        return orders;
    }
}

