package com.company.erp.crm.service;

import org.springframework.stereotype.Service;
import java.util.Currency;
import java.util.Map;

@Service
public class PricingEngineService {
    // Calculate price: Budgeted Hours × RSR + Gross Margin + cost components
    public double calculatePrice(double budgetedHours, double rsr, double grossMargin, Map<String, Double> costComponents) {
        double base = budgetedHours * rsr + grossMargin;
        double totalCost = costComponents != null ? costComponents.values().stream().mapToDouble(Double::doubleValue).sum() : 0.0;
        return base + totalCost;
    }

    // Multi-currency support (stub)
    public double convertCurrency(double amount, Currency from, Currency to) {
        // TODO: Integrate with FX API
        if (from.equals(to)) return amount;
        return amount * 1.1; // mock conversion
    }

    // Approval workflow for margins (stub)
    public boolean approveMargin(double margin, double threshold) {
        return margin >= threshold;
    }

    // Fetch RSR from HR module (stub)
    public double fetchRSRForEmployee(Long employeeId) {
        // TODO: Integrate with HR module
        return 1000.0; // mock RSR
    }
} 