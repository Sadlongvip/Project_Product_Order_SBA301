package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Shop;

public interface IShopRepository extends JpaRepository<Shop, Long> {

    Optional<Shop> findByAccountId(Long accountId);

}
