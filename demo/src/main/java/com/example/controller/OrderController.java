package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Order;
import com.example.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // GET /api/orders/{accountId} → danh sách đơn hàng của user
    @GetMapping("/{accountId}")
    public ResponseEntity<?> getOrdersByAccount(@PathVariable Long accountId) {
        try {
            List<Order> orders = orderService.getOrdersByAccountId(accountId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi lấy danh sách đơn hàng: " + e.getMessage());
        }
    }
    
    // GET /api/orders/shop/{shopId} → danh sách đơn hàng của shop
    @GetMapping("/shop/{shopId}")
    public ResponseEntity<?> getOrdersByShop(@PathVariable Long shopId) {
        try {
            List<Order> orders = orderService.getOrdersByShopId(shopId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi lấy danh sách đơn hàng cho shop: " + e.getMessage());
        }
    }

    @PostMapping("/checkout/{accountId}")
    public ResponseEntity<?> checkout(@PathVariable Long accountId) {
        try {
            List<Order> orders = orderService.checkout(accountId);
            return ResponseEntity.ok(orders);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi đặt hàng: " + e.getMessage());
        }
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId, @RequestParam(required = false) String reasonText) {
        try {
            Order order = orderService.cancelOrder(orderId, reasonText);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi hủy đơn hàng: " + e.getMessage());
        }
    }

    @PutMapping("/{orderId}/accept")
    public ResponseEntity<?> acceptOrder(@PathVariable Long orderId) {
        try {
            Order order = orderService.acceptOrder(orderId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi duyệt đơn hàng: " + e.getMessage());
        }
    }
}
