package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Item;

@Repository
public interface IItemRepository extends JpaRepository<Item, Long> {

    java.util.List<Item> findByShopId(Long shopId);
}
