package com.company.erp.crm.service;

import com.company.erp.crm.model.Notification;
import com.company.erp.crm.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    // CRUD
    public Notification createNotification(Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public Notification updateNotification(Long id, Notification details) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setType(details.getType());
            notification.setMessage(details.getMessage());
            notification.setRecipient(details.getRecipient());
            notification.setStatus(details.getStatus());
            notification.setScheduledAt(details.getScheduledAt());
            return notificationRepository.save(notification);
        }).orElse(null);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    // Trigger notification (stub)
    public Notification triggerNotification(String type, String message, String recipient) {
        Notification notification = new Notification();
        notification.setType(type);
        notification.setMessage(message);
        notification.setRecipient(recipient);
        notification.setStatus("Pending");
        notification.setCreatedAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    // Scheduled job for reminders/escalations (stub)
    @Scheduled(cron = "0 0 9 * * ?") // Every day at 9 AM
    public void sendDailyReminders() {
        // TODO: Implement reminder logic
    }
} 