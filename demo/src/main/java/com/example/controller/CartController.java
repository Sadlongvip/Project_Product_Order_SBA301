package com.example.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.CartItem;
import com.example.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // GET /api/cart/{accountId} - Lấy danh sách item trong giỏ hàng
    @GetMapping("/{accountId}")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long accountId) {
        return ResponseEntity.ok(cartService.getCartItems(accountId));
    }

    // POST /api/cart/{accountId}/item/{itemId} - Thêm sản phẩm vào giỏ hàng
    @PostMapping("/{accountId}/item/{itemId}")
    public ResponseEntity<CartItem> addToCart(
            @PathVariable Long accountId,
            @PathVariable Long itemId,
            @RequestParam(defaultValue = "1") int quantity) {
        return ResponseEntity.ok(cartService.addToCart(accountId, itemId, quantity));
    }

    // PUT /api/cart/{accountId}/item/{itemId} - Cập nhật số lượng sản phẩm
    @PutMapping("/{accountId}/item/{itemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable Long accountId,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(accountId, itemId, quantity));
    }

    // DELETE /api/cart/{accountId}/item/{itemId} - Xóa sản phẩm khỏi giỏ hàng
    @DeleteMapping("/{accountId}/item/{itemId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long accountId,
            @PathVariable Long itemId) {
        cartService.removeFromCart(accountId, itemId);
        return ResponseEntity.noContent().build();
    }

    // DELETE /api/cart/{accountId} - Xóa toàn bộ giỏ hàng
    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long accountId) {
        cartService.clearCart(accountId);
        return ResponseEntity.noContent().build();
    }

    // GET /api/cart/{accountId}/total - Lấy tổng tiền giỏ hàng
    @GetMapping("/{accountId}/total")
    public ResponseEntity<Double> getCartTotal(@PathVariable Long accountId) {
        return ResponseEntity.ok(cartService.getCartTotal(accountId));
    }
}
