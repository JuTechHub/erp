package com.company.erp.crm.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private Long id;
    private String type;
    private String message;
    private String recipient;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime scheduledAt;
    // Getters and setters
} 