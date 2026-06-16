package com.example.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.ItemRequest;
import com.example.dto.ItemResponse;
import com.example.model.Category;
import com.example.model.Item;
import com.example.repository.CategoryRepository;
import com.example.repository.ItemRepository;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    // ========================DTO========================

    // Helper: Entity -> Response
    public ItemResponse toResponse(Item item) {
        ItemResponse res = new ItemResponse();
        res.setId(item.getId());
        res.setName(item.getName());
        res.setDescription(item.getDescription());
        res.setPrice(item.getPrice());
        res.setImage(item.getImage());
        res.setStock(item.getStock());
        res.setCategoryId(item.getCategory().getId());
        res.setCategoryName(item.getCategory().getName());
        return res;
    }

    // Helper: Request -> Entity
    private Item toEntity(ItemRequest req) {
        Item item = new Item();
        item.setName(req.getName());
        item.setDescription(req.getDescription());
        item.setPrice(req.getPrice());
        item.setImage(req.getImage());
        item.setStock(req.getStock());
        Category cat = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        item.setCategory(cat);
        return item;
    }

    // GET all
    public List<ItemResponse> getAllItemDto() {
        return itemRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // GET by id
    public ItemResponse getItemByIdDto(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        return toResponse(item);
    }

    // POST - create
    public ItemResponse createItemDto(ItemRequest request) {
        Item item = toEntity(request);
        Item saved = itemRepository.save(item);
        return toResponse(saved);
    }

    // PUT - update
    public ItemResponse updateItemDto(Long id, ItemRequest request) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        item.setImage(request.getImage());
        item.setStock(request.getStock());
        Category cat = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        item.setCategory(cat);
        Item updated = itemRepository.save(item);
        return toResponse(updated);
    }

    // DELETE
    public void deleteItemDto(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new RuntimeException("Item not found");
        }
        itemRepository.deleteById(id);
    }
}
