package com.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Account;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Item;
import com.example.model.Order;
import com.example.model.OrderItem;
import com.example.model.OrderStatus;
import com.example.repository.IOrderRepository;
import com.example.repository.IItemRepository;

@Service
@Transactional
public class OrderService {

    @Autowired
    private IOrderRepository orderRepository;
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private AccountService accountService;
    
    @Autowired
    private IItemRepository itemRepository;

    // Lấy danh sách đơn hàng của 1 account
    public List<Order> getOrdersByAccountId(Long accountId) {
        return orderRepository.findByAccountId(accountId);
    }

    public Order checkout(Long accountId) {
        Account account = accountService.getAccountById(accountId);
        Cart cart = cartService.getCartByAccount(account);
        List<CartItem> cartItems = cart.getCartItems();
        
        if (cartItems == null || cartItems.isEmpty()) {
            throw new IllegalStateException("Giỏ hàng đang trống, không thể đặt hàng!");
        }
        
        // Kiểm tra tồn kho và trừ stock
        double totalPrice = 0;
        List<OrderItem> orderItems = new ArrayList<>();
        Order order = new Order();
        order.setAccount(account);
        order.setStatus(OrderStatus.PENDING);
        
        for (CartItem ci : cartItems) {
            Item item = ci.getItem();
            if (item.getStock() < ci.getQuantity()) {
                throw new IllegalStateException("Sản phẩm '" + item.getName() + "' không đủ số lượng tồn kho!");
            }
            item.setStock(item.getStock() - ci.getQuantity());
            itemRepository.save(item);
            
            OrderItem oi = new OrderItem();
            oi.setItem(item);
            oi.setOrder(order);
            oi.setPrice(ci.getPrice());
            oi.setQuantity(ci.getQuantity());
            orderItems.add(oi);
            
            totalPrice += ci.getPrice() * ci.getQuantity();
        }
        
        order.setOrderItems(orderItems);
        order.setTotalPrice(totalPrice);
        
        Order savedOrder = orderRepository.save(order);
        
        cartService.clearCart(accountId);
        
        return savedOrder;
    }

    public Order cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy đơn hàng: " + orderId));
                
        if (order.getStatus() == OrderStatus.CANCELLED) {
            return order;
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        
        // Hoàn lại stock
        for (OrderItem oi : order.getOrderItems()) {
            Item item = oi.getItem();
            item.setStock(item.getStock() + oi.getQuantity());
            itemRepository.save(item);
        }
        
        return orderRepository.save(order);
    }
    
    public Order acceptOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy đơn hàng: " + orderId));
                
        order.setStatus(OrderStatus.COMPLETED);
        return orderRepository.save(order);
    }
}

