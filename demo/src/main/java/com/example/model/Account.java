package com.example.model;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "Account")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account implements UserDetails {
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

    @Enumerated(jakarta.persistence.EnumType.STRING)
    private Role role;

    // ==================== Association ====================
    @JsonIgnoreProperties({ "account", "cartItems" })
    @OneToOne(mappedBy = "account")
    private Cart cart;

    @JsonIgnoreProperties({ "account", "orderItems" })
    @OneToMany(mappedBy = "account")
    private List<Order> orders;

    @JsonIgnoreProperties("account")
    @OneToOne(mappedBy = "account")
    private Shop shop;

    // ==================== UserDetails ====================
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email; // Dùng Email làm identifier chính
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}