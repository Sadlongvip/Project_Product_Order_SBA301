package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Shop;
import com.example.service.ShopService;

@RestController
@RequestMapping("/api/shop")
public class ShopController {
    @Autowired
    private ShopService shopService;

    @GetMapping
    public ResponseEntity<?> getAllShops(){
        return ResponseEntity.ok(shopService.getAllShops());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShopById(@PathVariable Long id){
        return ResponseEntity.ok(shopService.getShopById(id));
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> getShopByAccountId(@PathVariable Long accountId){
        Shop shop = shopService.getShopByAccountId(accountId);
        if (shop == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(shop);
    }

    @PostMapping
    public ResponseEntity<?> createShop(@RequestBody Shop shop){
        return ResponseEntity.ok(shopService.createShop(shop));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateShop(@PathVariable Long id, @RequestBody Shop shop){
        return ResponseEntity.ok(shopService.updateShop(id, shop));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShop(@PathVariable Long id){
        shopService.deleteShop(id);
        return ResponseEntity.ok("Shop deleted successfully");
    }

}
