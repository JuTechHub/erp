package com.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "features")
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "feature_key", unique = true, nullable = false)
    private String featureKey;
    
    @Column(name = "feature_name", nullable = false)
    private String featureName;
    
    @Column(name = "category", nullable = false)
    private String category;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "icon")
    private String icon;
    
    @Column(name = "route_path")
    private String routePath;
    
    // Constructors
    public Feature() {}
    
    public Feature(String featureKey, String featureName, String category, String description, String icon, String routePath) {
        this.featureKey = featureKey;
        this.featureName = featureName;
        this.category = category;
        this.description = description;
        this.icon = icon;
        this.routePath = routePath;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFeatureKey() { return featureKey; }
    public void setFeatureKey(String featureKey) { this.featureKey = featureKey; }
    
    public String getFeatureName() { return featureName; }
    public void setFeatureName(String featureName) { this.featureName = featureName; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    
    public String getRoutePath() { return routePath; }
    public void setRoutePath(String routePath) { this.routePath = routePath; }
}
