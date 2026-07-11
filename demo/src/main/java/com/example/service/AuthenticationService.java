package com.example.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.AuthResponse;
import com.example.dto.LoginRequest;
import com.example.dto.RegisterRequest;
import com.example.model.Role;
import com.example.model.Account;

import com.example.repository.IAccountRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final IAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse signup(RegisterRequest request) {
        if (accountRepository.findByEmail(request.email()).isPresent())
            throw new RuntimeException("Email đã được sử dụng: " + request.email());

        var account = Account.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .phoneNumber(request.phoneNumber())
                .address(request.address())
                .role(Role.USER)
                .build();
        accountRepository.save(account);
        return new AuthResponse(jwtService.generateToken(account));
    }

    public AuthResponse authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        var account = accountRepository.findByEmail(request.email()).orElseThrow();
        return new AuthResponse(jwtService.generateToken(account));
    }
}