package com.example.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.example.model.Account;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Item;
import com.example.repository.ICartItemRepository;
import com.example.repository.ICartRepository;
import com.example.repository.IItemRepository;

@Service
@Transactional
public class CartService {

    @Autowired
    private ICartRepository cartRepository;

    @Autowired
    private ICartItemRepository cartItemRepository;

    @Autowired
    private IItemRepository itemRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ItemService itemService;

    // 1. Get Cart (hoặc tạo mới nếu chưa có)
    public Cart getCartByAccount(Account account) {
        // Tìm Cart theo Account ID
        // Cách 1: Dùng method tự định nghĩa trong repository (nếu có)
        Optional<Cart> cartOpt = cartRepository.findByAccount(account);
        if (cartOpt.isPresent()) {
            return cartOpt.get();
        }

        // Cách 2: Nếu chưa có cart, tạo mới
        Cart newCart = new Cart();
        newCart.setAccount(account);
        return cartRepository.save(newCart);
    }

    // 2. Thêm sản phẩm vào giỏ hàng
    public CartItem addToCart(Long accountId, Long itemId, int quantity) {
        // Lấy Account
        Account account = getAccountById(accountId); 

        // Lấy Item
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        if (item.getShop() == null) {
            throw new IllegalStateException("Sản phẩm này không thuộc cửa hàng nào, không thể thêm vào giỏ hàng!");
        }

        // Lấy Cart của Account
        Cart cart = getCartByAccount(account);

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        Optional<CartItem> existingCartItemOpt = cartItemRepository.findByCartAndItem(cart, item);

        if (existingCartItemOpt.isPresent()) {
            // Nếu đã có, cập nhật số lượng
            CartItem existingCartItem = existingCartItemOpt.get();
            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            return cartItemRepository.save(existingCartItem);
        } else {
            // Nếu chưa có, tạo mới
            CartItem newCartItem = new CartItem();
            newCartItem.setCart(cart);
            newCartItem.setItem(item);
            newCartItem.setQuantity(quantity);
            newCartItem.setPrice(item.getPrice()); // Lưu thêm price
            return cartItemRepository.save(newCartItem);
        }
    }

    // 3. Xóa sản phẩm khỏi giỏ hàng
    public void removeFromCart(Long accountId, Long itemId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        Optional<CartItem> cartItemOpt = cartItemRepository.findByCartAndItem(cart, item);
        if (cartItemOpt.isPresent()) {
            cartItemRepository.delete(cartItemOpt.get());
        }
    }

    // 4. Cập nhật số lượng sản phẩm trong giỏ hàng
    public CartItem updateCartItemQuantity(Long accountId, Long itemId, int quantity) {
        if (quantity <= 0) {
            // Nếu số lượng <= 0, ta có thể xóa sản phẩm khỏi giỏ hàng
            removeFromCart(accountId, itemId);
            return null;
        }

        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NoSuchElementException("Item not found with id: " + itemId));

        Optional<CartItem> cartItemOpt = cartItemRepository.findByCartAndItem(cart, item);
        if (cartItemOpt.isPresent()) {
            CartItem cartItem = cartItemOpt.get();
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        } else {
            throw new NoSuchElementException("Cart item not found");
        }
    }

    // 5. Lấy danh sách tất cả các item trong giỏ hàng
    public List<CartItem> getCartItems(Long accountId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        return cart.getCartItems();
    }

    // 6. Xóa toàn bộ giỏ hàng
    public void clearCart(Long accountId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }

    // 7. Tính tổng tiền giỏ hàng
    public double getCartTotal(Long accountId) {
        Account account = getAccountById(accountId); // Cần implement
        Cart cart = getCartByAccount(account);

        return cart.getCartItems().stream()
                .mapToDouble(cartItem -> cartItem.getItem().getPrice() * cartItem.getQuantity())
                .sum();
    }


    private Account getAccountById(Long accountId) {
        return accountService.getAccountById(accountId);
    }
}
