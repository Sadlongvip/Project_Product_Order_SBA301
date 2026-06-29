package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CancelReason")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CancelReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "nvarchar(MAX)")
    private String reasonText;

    //==================== Association ====================
    @JsonIgnoreProperties("cancelReason")
    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
}
