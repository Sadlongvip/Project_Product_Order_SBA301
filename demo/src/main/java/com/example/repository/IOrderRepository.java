package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Order;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByAccountId(Long accountId);
    
    List<Order> findByShopId(Long shopId);
}
