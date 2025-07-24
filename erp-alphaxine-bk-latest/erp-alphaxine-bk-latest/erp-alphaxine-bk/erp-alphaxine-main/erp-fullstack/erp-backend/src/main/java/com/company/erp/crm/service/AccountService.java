package com.company.erp.crm.service;

import com.company.erp.crm.model.Account;
import com.company.erp.crm.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    // CRUD
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountById(Long id) {
        return accountRepository.findById(id);
    }

    public Account updateAccount(Long id, Account details) {
        return accountRepository.findById(id).map(account -> {
            account.setName(details.getName());
            account.setParentAccountId(details.getParentAccountId());
            account.setIndustry(details.getIndustry());
            account.setStatus(details.getStatus());
            account.setStrategicPlan(details.getStrategicPlan());
            account.setRenewalDate(details.getRenewalDate());
            return accountRepository.save(account);
        }).orElse(null);
    }

    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    // Parent-child relationship
    public List<Account> getChildAccounts(Long parentId) {
        return accountRepository.findAll().stream()
            .filter(a -> parentId.equals(a.getParentAccountId()))
            .toList();
    }

    // Contract renewal tracking (stub)
    public List<Account> getAccountsForRenewal(String renewalDate) {
        return accountRepository.findAll().stream()
            .filter(a -> renewalDate.equals(a.getRenewalDate()))
            .toList();
    }
} 