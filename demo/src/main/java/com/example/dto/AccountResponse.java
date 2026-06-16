package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AccountResponse {
    private String username;

    public AccountResponse(String username){
        this.username = username;
    }
}
