package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String name;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String address;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String phone;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String email;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String logo;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String banner;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(MAX)")
    private String description;
    @jakarta.persistence.Column(columnDefinition = "nvarchar(255)")
    private String status;

    @OneToOne
    @JsonIgnoreProperties("shop")
    @JoinColumn(name = "account_id", nullable = true, unique = true)
    private Account account;
}
