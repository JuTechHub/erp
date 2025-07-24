package com.company.erp.crm.controller;

import com.company.erp.crm.model.Opportunity;
import com.company.erp.crm.service.OpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/crm/opportunities")
public class OpportunityController {
    @Autowired
    private OpportunityService opportunityService;

    @PostMapping
    public Opportunity createOpportunity(@RequestBody Opportunity opportunity) {
        return opportunityService.createOpportunity(opportunity);
    }

    @GetMapping
    public List<Opportunity> getAllOpportunities() {
        return opportunityService.getAllOpportunities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Opportunity> getOpportunityById(@PathVariable Long id) {
        Optional<Opportunity> opportunity = opportunityService.getOpportunityById(id);
        return opportunity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Opportunity> updateOpportunity(@PathVariable Long id, @RequestBody Opportunity details) {
        Opportunity updated = opportunityService.updateOpportunity(id, details);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/forecast")
    public ResponseEntity<Double> forecastRevenue(@PathVariable Long id) {
        Optional<Opportunity> opportunity = opportunityService.getOpportunityById(id);
        if (opportunity.isPresent()) {
            double forecast = opportunityService.forecastRevenue(opportunity.get());
            return ResponseEntity.ok(forecast);
        }
        return ResponseEntity.notFound().build();
    }
} 