package com.erp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_feature_permissions")
public class UserFeaturePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "feature_id", nullable = false)
    private Feature feature;
    
    @ManyToOne
    @JoinColumn(name = "granted_by", nullable = false)
    private User grantedBy;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Audit fields
    @Column(name = "granted_at")
    private LocalDateTime grantedAt;
    
    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;
    
    @Column(name = "revoked_by")
    private Long revokedBy;
    
    @Column(name = "notes")
    private String notes;

    // Constructors
    public UserFeaturePermission() {}

    public UserFeaturePermission(User user, Feature feature, User grantedBy) {
        this.user = user;
        this.feature = feature;
        this.grantedBy = grantedBy;
        this.isActive = true;
        this.grantedAt = LocalDateTime.now();
    }
    
    public UserFeaturePermission(User user, Feature feature, User grantedBy, String notes) {
        this.user = user;
        this.feature = feature;
        this.grantedBy = grantedBy;
        this.isActive = true;
        this.grantedAt = LocalDateTime.now();
        this.notes = notes;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Feature getFeature() { return feature; }
    public void setFeature(Feature feature) { this.feature = feature; }

    public User getGrantedBy() { return grantedBy; }
    public void setGrantedBy(User grantedBy) { this.grantedBy = grantedBy; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getGrantedAt() { return grantedAt; }
    public void setGrantedAt(LocalDateTime grantedAt) { this.grantedAt = grantedAt; }
    
    public LocalDateTime getRevokedAt() { return revokedAt; }
    public void setRevokedAt(LocalDateTime revokedAt) { this.revokedAt = revokedAt; }
    
    public Long getRevokedBy() { return revokedBy; }
    public void setRevokedBy(Long revokedBy) { this.revokedBy = revokedBy; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    // Helper methods
    public void revoke(Long revokedBy) {
        this.isActive = false;
        this.revokedAt = LocalDateTime.now();
        this.revokedBy = revokedBy;
    }
    
    public void activate() {
        this.isActive = true;
        this.revokedAt = null;
        this.revokedBy = null;
    }
}
