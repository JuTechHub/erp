package com.company.erp.crm.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "crm_accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long parentAccountId;
    private String industry;
    private String status;
    private String strategicPlan;
    private String renewalDate;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Long getParentAccountId() { return parentAccountId; }
    public void setParentAccountId(Long parentAccountId) { this.parentAccountId = parentAccountId; }
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getStrategicPlan() { return strategicPlan; }
    public void setStrategicPlan(String strategicPlan) { this.strategicPlan = strategicPlan; }
    public String getRenewalDate() { return renewalDate; }
    public void setRenewalDate(String renewalDate) { this.renewalDate = renewalDate; }
} 