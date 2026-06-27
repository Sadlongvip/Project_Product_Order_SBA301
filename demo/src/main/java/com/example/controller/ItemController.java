package com.example.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ItemRequest;
import com.example.model.Item;
import com.example.service.ItemService;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItemDto());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemByIdDto(id));
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<Item>> getItemsByShopId(@PathVariable Long shopId) {
        return ResponseEntity.ok(itemService.getItemsByShopIdDto(shopId));
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.createItemDto(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.updateItemDto(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItemDto(id);
        return ResponseEntity.noContent().build();
    }
}
