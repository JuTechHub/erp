package com.company.erp.crm.repository;

import com.company.erp.crm.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
} 