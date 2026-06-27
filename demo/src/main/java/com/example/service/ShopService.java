package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Account;
import com.example.model.Shop;
import com.example.repository.IAccountRepository;
import com.example.repository.IShopRepository;

@Service
@Transactional
public class ShopService {
    @Autowired
    private IShopRepository shopRepository;

    @Autowired
    private IAccountRepository accountRepository;

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public Shop getShopById(Long id) {
        return shopRepository.findById(id).orElse(null);
    }

    public Shop getShopByAccountId(Long accountId) {
        return shopRepository.findByAccountId(accountId).orElse(null);
    }

    public Shop createShop(Shop shop) {
        if (shop.getAccount() != null && shop.getAccount().getId() != null) {
            Account account = accountRepository.findById(shop.getAccount().getId()).orElse(null);
            shop.setAccount(account);
        }
        return shopRepository.save(shop);
    }

    public Shop updateShop(Long id, Shop shop) {
        Shop existingShop = getShopById(id);
        if (existingShop != null) {
            existingShop.setName(shop.getName());
            existingShop.setDescription(shop.getDescription());
            existingShop.setAddress(shop.getAddress());
            existingShop.setPhone(shop.getPhone());
            existingShop.setEmail(shop.getEmail());
            existingShop.setLogo(shop.getLogo());
            existingShop.setBanner(shop.getBanner());
            existingShop.setStatus(shop.getStatus());
            return shopRepository.save(existingShop);
        }
        return null;
    }

    public void deleteShop(Long id) {
        shopRepository.deleteById(id);
    }

}
