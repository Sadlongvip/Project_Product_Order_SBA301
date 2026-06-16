package com.example.controller;

import java.util.List;

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
import com.example.dto.ItemResponse;
import com.example.service.ItemService;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<ItemResponse> getAllItems() {
        return itemService.getAllItemDto();
    }

    @GetMapping("/{id}")
    public ItemResponse getItemById(@PathVariable Long id) {
        return itemService.getItemByIdDto(id);
    }

    @PostMapping
    public ItemResponse createItem(@RequestBody @Valid ItemRequest request) {
        return itemService.createItemDto(request);
    }

    @PutMapping("/{id}")
    public ItemResponse updateItem(@PathVariable Long id, @RequestBody @Valid ItemRequest request) {
        return itemService.updateItemDto(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItemDto(id);
    }
}
