package com.example.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dto.ItemRequest;
import com.example.model.Category;
import com.example.model.Item;
import com.example.repository.ICategoryRepository;
import com.example.repository.IItemRepository;
import com.example.repository.IShopRepository;
import com.example.model.Shop;

@Service
@Transactional
public class ItemService {

    @Autowired
    private IItemRepository itemRepository;

    @Autowired
    private ICategoryRepository categoryRepository;
    
    @Autowired
    private IShopRepository shopRepository;
    // ========================DTO========================



    // Helper: Request -> Entity
    private Item toEntity(ItemRequest req) {
        Item item = new Item();
        item.setName(req.name());
        item.setDescription(req.description());
        item.setPrice(req.price());
        item.setImage(req.image());
        item.setStock(req.stock());
        Category cat = categoryRepository.findById(req.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        item.setCategory(cat);
        
        if (req.shopId() != null) {
            Shop shop = shopRepository.findById(req.shopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));
            item.setShop(shop);
        }
        
        return item;
    }

    // GET all
    public List<Item> getAllItemDto() {
        return itemRepository.findAll();
    }

    // GET by shop ID
    public List<Item> getItemsByShopIdDto(Long shopId) {
        return itemRepository.findByShopId(shopId);
    }

    // GET by id
    public Item getItemByIdDto(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        return item;
    }

    // POST - create
    public Item createItemDto(ItemRequest request) {
        Item item = toEntity(request);
        Item saved = itemRepository.save(item);
        return saved;
    }

    // PUT - update
    public Item updateItemDto(Long id, ItemRequest request) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(request.name());
        item.setDescription(request.description());
        item.setPrice(request.price());
        item.setImage(request.image());
        item.setStock(request.stock());
        Category cat = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        item.setCategory(cat);
        
        if (request.shopId() != null) {
            Shop shop = shopRepository.findById(request.shopId())
                    .orElseThrow(() -> new RuntimeException("Shop not found"));
            item.setShop(shop);
        }
        
        Item updated = itemRepository.save(item);
        return updated;
    }

    // DELETE
    public void deleteItemDto(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new RuntimeException("Item not found");
        }
        itemRepository.deleteById(id);
    }
}
