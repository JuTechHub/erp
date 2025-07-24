package com.company.erp.crm.service;

import com.company.erp.crm.model.Lead;
import com.company.erp.crm.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeadService {
    @Autowired
    private LeadRepository leadRepository;

    // CRUD
    public Lead createLead(Lead lead) {
        lead.setScore(scoreLead(lead));
        lead.setAssignedTo(autoAssignSalesRep(lead));
        return leadRepository.save(lead);
    }

    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Optional<Lead> getLeadById(Long id) {
        return leadRepository.findById(id);
    }

    public Lead updateLead(Long id, Lead leadDetails) {
        return leadRepository.findById(id).map(lead -> {
            lead.setName(leadDetails.getName());
            lead.setSource(leadDetails.getSource());
            lead.setContactInfo(leadDetails.getContactInfo());
            lead.setIndustry(leadDetails.getIndustry());
            lead.setEstimatedBudget(leadDetails.getEstimatedBudget());
            lead.setStatus(leadDetails.getStatus());
            lead.setRegion(leadDetails.getRegion());
            lead.setAuthority(leadDetails.getAuthority());
            lead.setNeed(leadDetails.getNeed());
            lead.setTimeline(leadDetails.getTimeline());
            lead.setScore(scoreLead(leadDetails));
            lead.setAssignedTo(autoAssignSalesRep(leadDetails));
            return leadRepository.save(lead);
        }).orElse(null);
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }

    // Lead scoring logic (simple example)
    public int scoreLead(Lead lead) {
        int score = 0;
        if (lead.getEstimatedBudget() != null && lead.getEstimatedBudget() > 100000) score += 20;
        if (lead.getTimeline() != null && lead.getTimeline().equalsIgnoreCase("urgent")) score += 20;
        if (lead.getAuthority() != null && lead.getAuthority().equalsIgnoreCase("decision-maker")) score += 30;
        if (lead.getNeed() != null && lead.getNeed().equalsIgnoreCase("high")) score += 30;
        return score;
    }

    // Auto-assignment logic (stub)
    public String autoAssignSalesRep(Lead lead) {
        // TODO: Implement region/workload-based assignment
        return "sales_rep_1";
    }

    // Lead to Opportunity conversion (stub)
    public boolean convertToOpportunity(Long leadId) {
        // TODO: Implement conversion logic with approval
        return true;
    }
}
