package com.example.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Account;
import com.example.model.CancelReason;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Item;
import com.example.model.Order;
import com.example.model.OrderItem;
import com.example.model.OrderStatus;
import com.example.model.Shop;
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
    
    // Lấy danh sách đơn hàng của 1 shop
    public List<Order> getOrdersByShopId(Long shopId) {
        return orderRepository.findByShopId(shopId);
    }

    public List<Order> checkout(Long accountId) {
        Account account = accountService.getAccountById(accountId);
        Cart cart = cartService.getCartByAccount(account);
        List<CartItem> cartItems = cart.getCartItems();
        
        if (cartItems == null || cartItems.isEmpty()) {
            throw new IllegalStateException("Giỏ hàng đang trống, không thể đặt hàng!");
        }
        
        // Nhóm CartItem theo Shop
        Map<Shop, List<CartItem>> itemsByShop = new HashMap<>();
        for (CartItem ci : cartItems) {
            Shop shop = ci.getItem().getShop();
            if (shop == null) {
                throw new IllegalStateException("Sản phẩm '" + ci.getItem().getName() + "' không thuộc về Shop nào!");
            }
            itemsByShop.computeIfAbsent(shop, k -> new ArrayList<>()).add(ci);
        }
        
        List<Order> savedOrders = new ArrayList<>();
        
        // Tạo mỗi Order cho một Shop
        for (Map.Entry<Shop, List<CartItem>> entry : itemsByShop.entrySet()) {
            Shop shop = entry.getKey();
            List<CartItem> shopCartItems = entry.getValue();
            
            double totalPrice = 0;
            List<OrderItem> orderItems = new ArrayList<>();
            Order order = new Order();
            order.setAccount(account);
            order.setShop(shop); // Gán Shop cho Order
            order.setStatus(OrderStatus.PENDING);
            
            for (CartItem ci : shopCartItems) {
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
            
            savedOrders.add(orderRepository.save(order));
        }
        
        cartService.clearCart(accountId);
        
        return savedOrders;
    }

    public Order cancelOrder(Long orderId, String reasonText) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy đơn hàng: " + orderId));
                
        if (order.getStatus() == OrderStatus.CANCELLED) {
            return order;
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        
        // Lưu nguyên nhân hủy
        if (reasonText != null && !reasonText.trim().isEmpty()) {
            CancelReason cr = new CancelReason();
            cr.setReasonText(reasonText);
            cr.setOrder(order);
            order.setCancelReason(cr); // Cascade.ALL sẽ lưu giùm
        }
        
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
