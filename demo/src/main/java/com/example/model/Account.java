package com.example.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Account")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "nvarchar(255)")
    private String username;

    @Column(nullable = false, columnDefinition = "nvarchar(255)")
    private String password;

    @Column(nullable = false, columnDefinition = "nvarchar(255)")
    private String email;

    @Column(nullable = true, columnDefinition = "nvarchar(255)")
    private String phoneNumber;

    @Column(nullable = true, columnDefinition = "nvarchar(255)")
    private String address;

    // ==================== Association ====================
    @JsonIgnoreProperties({"account", "cartItems"})
    @OneToOne(mappedBy = "account")
    private Cart cart;

    @JsonIgnoreProperties({"account", "orderItems"})
    @OneToMany(mappedBy = "account")
    private List<Order> orders;

    @JsonIgnoreProperties("account")
    @OneToOne(mappedBy = "account")
    private Shop shop;
}