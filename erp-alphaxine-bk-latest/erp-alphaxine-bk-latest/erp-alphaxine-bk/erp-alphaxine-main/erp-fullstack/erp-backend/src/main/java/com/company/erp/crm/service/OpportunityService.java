package com.company.erp.crm.service;

import com.company.erp.crm.model.Opportunity;
import com.company.erp.crm.repository.OpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OpportunityService {
    @Autowired
    private OpportunityRepository opportunityRepository;

    // CRUD
    public Opportunity createOpportunity(Opportunity opportunity) {
        opportunity.setProbability(calculateProbability(opportunity));
        return opportunityRepository.save(opportunity);
    }

    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAll();
    }

    public Optional<Opportunity> getOpportunityById(Long id) {
        return opportunityRepository.findById(id);
    }

    public Opportunity updateOpportunity(Long id, Opportunity details) {
        return opportunityRepository.findById(id).map(opportunity -> {
            opportunity.setName(details.getName());
            opportunity.setStage(details.getStage());
            opportunity.setDealSize(details.getDealSize());
            opportunity.setCompetitiveAnalysis(details.getCompetitiveAnalysis());
            opportunity.setSector(details.getSector());
            opportunity.setRegion(details.getRegion());
            opportunity.setStatus(details.getStatus());
            opportunity.setLeadId(details.getLeadId());
            opportunity.setProbability(calculateProbability(details));
            return opportunityRepository.save(opportunity);
        }).orElse(null);
    }

    public void deleteOpportunity(Long id) {
        opportunityRepository.deleteById(id);
    }

    // Stage tracking (Qualification → Proposal → Negotiation → Closed)
    public String nextStage(String currentStage) {
        switch (currentStage) {
            case "Qualification": return "Proposal";
            case "Proposal": return "Negotiation";
            case "Negotiation": return "Closed";
            default: return currentStage;
        }
    }

    // Probability calculation logic (simple example)
    public double calculateProbability(Opportunity opportunity) {
        switch (opportunity.getStage()) {
            case "Qualification": return 0.2;
            case "Proposal": return 0.5;
            case "Negotiation": return 0.8;
            case "Closed": return opportunity.getStatus().equalsIgnoreCase("Won") ? 1.0 : 0.0;
            default: return 0.0;
        }
    }

    // Revenue forecasting
    public double forecastRevenue(Opportunity opportunity) {
        if (opportunity.getDealSize() == null) return 0.0;
        return opportunity.getDealSize() * calculateProbability(opportunity);
    }
} 