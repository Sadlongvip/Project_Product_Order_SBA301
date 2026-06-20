package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.CartItemResponse;
import com.example.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // GET /api/cart/{accountId} - Lấy danh sách item trong giỏ hàng
    @GetMapping("/{accountId}")
    public List<CartItemResponse> getCartItems(@PathVariable Long accountId) {
        return cartService.getCartItems(accountId);
    }

    // POST /api/cart/{accountId}/item/{itemId} - Thêm sản phẩm vào giỏ hàng
    @PostMapping("/{accountId}/item/{itemId}")
    public CartItemResponse addToCart(
            @PathVariable Long accountId,
            @PathVariable Long itemId,
            @RequestParam(defaultValue = "1") int quantity) {
        return cartService.addToCart(accountId, itemId, quantity);
    }

    // PUT /api/cart/{accountId}/item/{itemId} - Cập nhật số lượng sản phẩm
    @PutMapping("/{accountId}/item/{itemId}")
    public CartItemResponse updateCartItem(
            @PathVariable Long accountId,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        return cartService.updateCartItemQuantity(accountId, itemId, quantity);
    }

    // DELETE /api/cart/{accountId}/item/{itemId} - Xóa sản phẩm khỏi giỏ hàng
    @DeleteMapping("/{accountId}/item/{itemId}")
    public void removeFromCart(
            @PathVariable Long accountId,
            @PathVariable Long itemId) {
        cartService.removeFromCart(accountId, itemId);
    }

    // DELETE /api/cart/{accountId} - Xóa toàn bộ giỏ hàng
    @DeleteMapping("/{accountId}")
    public void clearCart(@PathVariable Long accountId) {
        cartService.clearCart(accountId);
    }

    // GET /api/cart/{accountId}/total - Lấy tổng tiền giỏ hàng
    @GetMapping("/{accountId}/total")
    public double getCartTotal(@PathVariable Long accountId) {
        return cartService.getCartTotal(accountId);
    }
}
