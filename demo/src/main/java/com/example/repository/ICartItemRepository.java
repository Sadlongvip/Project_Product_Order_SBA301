package com.example.repository;

import com.example.model.Account;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndItem(Cart cart, Item item);
}
