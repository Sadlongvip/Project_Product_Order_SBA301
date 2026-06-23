package com.example.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dto.LoginResponse;
import com.example.model.Account;
import com.example.repository.IAccountRepository;

@Service
public class AccountService {
    private final IAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountService(IAccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public Account createAccount(Account account){
        Optional<Account> existAccount = accountRepository.findByEmail(account.getEmail());
        if(existAccount.isPresent()){
            throw new IllegalArgumentException("This account already exists");
        }
        // Mã hóa password
        account.setPassword(passwordEncoder.encode(account.getPassword()));

        return accountRepository.save(account);
    }

    public LoginResponse checkLogin(String email, String password) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);

        Account account = accountOpt
                .filter(a -> passwordEncoder.matches(password, a.getPassword()))
                .orElse(null);

        if (account == null) {
            return null;
        }

        return new LoginResponse(account.getId(), account.getEmail());
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Account not found with id: " + id));
    }

    public Account updateAccount(Long id, Account account) {
        Account existingAccount = accountRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Account not found with id: " + id));

        if (account.getUsername() != null) {
            existingAccount.setUsername(account.getUsername());
        }

        if (account.getEmail() != null) {
            existingAccount.setEmail(account.getEmail());
        }

        if (account.getPhoneNumber() != null) {
            existingAccount.setPhoneNumber(account.getPhoneNumber());
        }

        if (account.getAddress() != null) {
            existingAccount.setAddress(account.getAddress());
        }

        return accountRepository.save(existingAccount);
    }

}
