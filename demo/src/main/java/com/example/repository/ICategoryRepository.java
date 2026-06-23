package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Category;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {

}
