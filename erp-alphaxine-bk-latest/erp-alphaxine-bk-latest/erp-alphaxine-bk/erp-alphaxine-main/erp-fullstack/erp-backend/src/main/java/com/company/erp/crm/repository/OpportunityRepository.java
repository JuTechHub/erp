package com.company.erp.crm.repository;

import com.company.erp.crm.model.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
} 