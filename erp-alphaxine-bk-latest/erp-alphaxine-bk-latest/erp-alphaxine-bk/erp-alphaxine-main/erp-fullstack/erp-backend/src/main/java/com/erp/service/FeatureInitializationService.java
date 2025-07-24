package com.erp.service;

import com.erp.model.Feature;
import com.erp.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureInitializationService {
    
    @Autowired
    private FeatureRepository featureRepository;
    
    
    @Transactional
    public void initializeFeatures() {
        initializeFeaturesIfEmpty();
    }
    
    public void initializeFeaturesIfEmpty() {
        // Only initialize if features table is empty
        if (featureRepository.count() == 0) {
            createDefaultFeatures();
        }
    }
    
    private void createDefaultFeatures() {
        // Dashboard & Profile
        createFeatureIfNotExists("dashboard", "Dashboard", "Dashboard & Profile", 
            "View personal dashboard with key metrics", "📊", "/employee/dashboard");
        createFeatureIfNotExists("profile", "My Profile", "Dashboard & Profile", 
            "Manage personal information and settings", "👤", "/employee/profile");
        
        // Attendance Management
        createFeatureIfNotExists("attendance-checkin", "Check In/Out", "Attendance Management", 
            "Daily attendance check-in and check-out", "⏰", "/employee/attendance/checkin");
        createFeatureIfNotExists("attendance-history", "Attendance History", "Attendance Management", 
            "View past attendance records", "📅", "/employee/attendance/history");
        createFeatureIfNotExists("attendance-reports", "Attendance Reports", "Attendance Management", 
            "Generate attendance reports", "📈", "/employee/attendance/reports");
        
        // Leave Management
        createFeatureIfNotExists("apply-leave", "Apply Leave", "Leave Management", 
            "Submit new leave requests", "📝", "/employee/leave/apply");
        createFeatureIfNotExists("leave-status", "Leave Status", "Leave Management", 
            "Track leave application status", "🔍", "/employee/leave/status");
        createFeatureIfNotExists("leave-balance", "Leave Balance", "Leave Management", 
            "View available leave balance", "⚖️", "/employee/leave/balance");
        createFeatureIfNotExists("leave-calendar", "Leave Calendar", "Leave Management", 
            "View team leave calendar", "📆", "/employee/leave/calendar");
        
        // Payroll & Finance
        createFeatureIfNotExists("payroll-slip", "Pay Slips", "Payroll & Finance", 
            "Download and view pay slips", "💰", "/employee/payroll/slip");
        createFeatureIfNotExists("payroll-history", "Payroll History", "Payroll & Finance", 
            "View salary history and details", "📊", "/employee/payroll/history");
        createFeatureIfNotExists("tax-documents", "Tax Documents", "Payroll & Finance", 
            "Access tax-related documents", "📄", "/employee/payroll/tax");
        
        // Company Information
        createFeatureIfNotExists("holiday-calendar", "Holiday Calendar", "Company Information", 
            "View company holidays", "🎉", "/employee/holidays");
        createFeatureIfNotExists("announcements", "Announcements", "Company Information", 
            "Company news and updates", "📢", "/employee/announcements");
        createFeatureIfNotExists("employee-directory", "Employee Directory", "Company Information", 
            "Company employee contacts", "👥", "/employee/directory");
        
        // Claims & Collections
        createFeatureIfNotExists("claims", "My Claims", "Claims & Collections", 
            "Manage expense claims and requests", "📋", "/employee/claims");
        createFeatureIfNotExists("collections", "My Collections", "Claims & Collections", 
            "View collection records and status", "💳", "/employee/collections");

        // CRM Features
        createFeatureIfNotExists("crm-leads", "Leads", "CRM", "Manage sales leads", "📋", "/crm/leads");
        createFeatureIfNotExists("crm-opportunities", "Opportunities", "CRM", "Manage sales opportunities", "💼", "/crm/opportunities");
        createFeatureIfNotExists("crm-accounts", "Accounts", "CRM", "Manage customer accounts", "🏢", "/crm/accounts");
        createFeatureIfNotExists("crm-proposals", "Proposals", "CRM", "Manage sales proposals", "📑", "/crm/proposals");
        createFeatureIfNotExists("crm-dashboard", "CRM Dashboard", "CRM", "View CRM analytics dashboard", "📊", "/crm/dashboard");
        createFeatureIfNotExists("crm-analytics", "CRM Analytics", "CRM", "View CRM analytics and reports", "📈", "/crm/analytics");
    }
    
    private void createFeatureIfNotExists(String featureKey, String featureName, String category, 
                                        String description, String icon, String routePath) {
        Optional<Feature> existingFeature = featureRepository.findByFeatureKey(featureKey);
        if (existingFeature.isEmpty()) {
            Feature feature = new Feature(featureKey, featureName, category, description, icon, routePath);
            featureRepository.save(feature);
        }
    }
    
    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }
    
    public void resetFeatures() {
        featureRepository.deleteAll();
        createDefaultFeatures();
    }
}
