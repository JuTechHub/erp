package com.erp.controller;

import com.erp.model.Feature;
import com.erp.model.User;
import com.erp.model.UserFeaturePermission;
import com.erp.repository.FeatureRepository;
import com.erp.repository.UserFeaturePermissionRepository;
import com.erp.repository.UserRepository;
import com.erp.service.FeatureInitializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rbac")
@CrossOrigin(origins = "http://localhost:5173")
public class RBACController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FeatureRepository featureRepository;
    
    @Autowired
    private UserFeaturePermissionRepository permissionRepository;
    
    @Autowired
    private FeatureInitializationService featureInitializationService;
    
    @GetMapping("/features")
    public ResponseEntity<List<Feature>> getAllFeatures() {
        List<Feature> features = featureRepository.findAll();
        return ResponseEntity.ok(features);
    }
    
    @PostMapping("/features")
    public ResponseEntity<Feature> createFeature(@RequestBody Feature feature) {
        try {
            // Check if feature already exists
            if (featureRepository.findByFeatureKey(feature.getFeatureKey()).isPresent()) {
                return ResponseEntity.ok(featureRepository.findByFeatureKey(feature.getFeatureKey()).get());
            }
            Feature savedFeature = featureRepository.save(feature);
            return ResponseEntity.ok(savedFeature);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll().stream()
            .filter(user -> "EMPLOYEE".equals(user.getRole()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/permissions/{userId}")
    public ResponseEntity<List<String>> getUserPermissions(@PathVariable Long userId) {
        List<UserFeaturePermission> permissions = permissionRepository.findActivePermissionsByUserId(userId);
        List<String> featureKeys = permissions.stream()
            .map(p -> p.getFeature().getFeatureKey())
            .collect(Collectors.toList());
        return ResponseEntity.ok(featureKeys);
    }
    
    @PostMapping("/permissions/{userId}")
    public ResponseEntity<String> saveUserPermissions(
            @PathVariable Long userId, 
            @RequestBody List<String> featureKeys,
            @RequestParam Long grantedBy) {
        
        try {
            User user = userRepository.findById(userId).orElse(null);
            User admin = userRepository.findById(grantedBy).orElse(null);
            
            if (user == null || admin == null) {
                return ResponseEntity.badRequest().body("User or Admin not found");
            }
            
            // Delete existing permissions
            permissionRepository.deleteByUserId(userId);
            
            // Add new permissions
            for (String featureKey : featureKeys) {
                Feature feature = featureRepository.findByFeatureKey(featureKey).orElse(null);
                if (feature != null) {
                    UserFeaturePermission permission = new UserFeaturePermission(user, feature, admin);
                    permissionRepository.save(permission);
                }
            }
            
            return ResponseEntity.ok("Permissions saved successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error saving permissions: " + e.getMessage());
        }
    }
    
    @GetMapping("/user-features/{userId}")
    public ResponseEntity<List<Feature>> getUserFeatures(@PathVariable Long userId) {
        List<UserFeaturePermission> permissions = permissionRepository.findActivePermissionsByUserId(userId);
        List<Feature> features = permissions.stream()
            .map(UserFeaturePermission::getFeature)
            .collect(Collectors.toList());
        return ResponseEntity.ok(features);
    }
    
    @GetMapping("/debug/all-users")
    public ResponseEntity<List<User>> getAllUsersDebug() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/initialize-features")
    public ResponseEntity<String> initializeFeatures() {
        try {
            featureInitializationService.resetFeatures();
            return ResponseEntity.ok("Features initialized successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error initializing features: " + e.getMessage());
        }
    }
}
