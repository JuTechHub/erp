package com.erp.service;

import com.erp.model.Feature;
import com.erp.model.User;
import com.erp.repository.FeatureRepository;
import com.erp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DataInitializationService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FeatureRepository featureRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultUsers();
        initializeDefaultFeatures();
    }

    private void initializeDefaultUsers() {
        // Check if admin user exists
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User("admin", "admin123", "SUPER_ADMIN");
            admin.setFullName("System Administrator");
            admin.setEmployeeId("ADMIN001");
            admin.setEmail("admin@company.com");
            admin.setDepartment("IT");
            admin.setDesignation("System Administrator");
            userRepository.save(admin);
            System.out.println("Admin user created: admin/admin123");
        }

        // Check if sample employee exists
        if (userRepository.findByUsername("john.doe").isEmpty()) {
            User employee = new User("john.doe", "password123", "EMPLOYEE");
            employee.setFullName("John Doe");
            employee.setEmployeeId("EMP001");
            employee.setEmail("john.doe@company.com");
            employee.setDepartment("HR");
            employee.setDesignation("HR Manager");
            userRepository.save(employee);
            System.out.println("Sample employee created: john.doe/password123");
        }

        // Check if another sample employee exists
        if (userRepository.findByUsername("jane.smith").isEmpty()) {
            User employee2 = new User("jane.smith", "password123", "EMPLOYEE");
            employee2.setFullName("Jane Smith");
            employee2.setEmployeeId("EMP002");
            employee2.setEmail("jane.smith@company.com");
            employee2.setDepartment("Finance");
            employee2.setDesignation("Accountant");
            userRepository.save(employee2);
            System.out.println("Sample employee created: jane.smith/password123");
        }
    }

    private void initializeDefaultFeatures() {
        List<Feature> defaultFeatures = Arrays.asList(
            // Dashboard & Profile
            new Feature("VIEW_DASHBOARD", "Dashboard", "Dashboard & Profile", "View personal dashboard with key metrics", "📊", "/dashboard"),
            new Feature("VIEW_PROFILE", "My Profile", "Dashboard & Profile", "Manage personal information and settings", "👤", "/profile"),
            
            // Attendance Management
            new Feature("VIEW_ATTENDANCE", "Check In/Out", "Attendance Management", "Daily attendance check-in and check-out", "⏰", "/attendance/checkin"),
            new Feature("VIEW_ATTENDANCE_HISTORY", "Attendance History", "Attendance Management", "View past attendance records", "📅", "/attendance/history"),
            new Feature("VIEW_ATTENDANCE_REPORTS", "Attendance Reports", "Attendance Management", "Generate attendance reports", "📈", "/attendance/reports"),
            
            // Leave Management
            new Feature("APPLY_LEAVE", "Apply Leave", "Leave Management", "Submit new leave requests", "📝", "/leave/apply"),
            new Feature("VIEW_LEAVE_STATUS", "Leave Status", "Leave Management", "Track leave application status", "🔍", "/leave/status"),
            new Feature("VIEW_LEAVE_BALANCE", "Leave Balance", "Leave Management", "View available leave balance", "⚖️", "/leave/balance"),
            new Feature("VIEW_LEAVE_CALENDAR", "Leave Calendar", "Leave Management", "View team leave calendar", "📆", "/leave/calendar"),
            
            // Payroll & Finance
            new Feature("VIEW_PAYROLL", "Pay Slips", "Payroll & Finance", "Download and view pay slips", "💰", "/payroll/slip"),
            new Feature("VIEW_PAYROLL_HISTORY", "Payroll History", "Payroll & Finance", "View salary history and details", "📊", "/payroll/history"),
            new Feature("VIEW_TAX_DOCUMENTS", "Tax Documents", "Payroll & Finance", "Access tax-related documents", "📄", "/payroll/tax"),
            
            // Company Information
            new Feature("VIEW_HOLIDAYS", "Holiday Calendar", "Company Information", "View company holidays", "🎉", "/holidays"),
            new Feature("VIEW_ANNOUNCEMENTS", "Announcements", "Company Information", "Company news and updates", "📢", "/announcements"),
            new Feature("VIEW_EMPLOYEE_DIRECTORY", "Employee Directory", "Company Information", "Company employee contacts", "👥", "/employees"),
            
            // Claims & Collections
            new Feature("VIEW_CLAIMS", "Claims", "Finance", "Manage expense claims", "💼", "/claims"),
            new Feature("VIEW_COLLECTIONS", "Collections", "Finance", "Manage collections", "📋", "/collections"),
            
            // Admin Features
            new Feature("MANAGE_EMPLOYEES", "Manage Employees", "Administration", "Add, edit, and manage employees", "👥", "/admin/employees"),
            new Feature("MANAGE_DEPARTMENTS", "Manage Departments", "Administration", "Manage company departments", "🏛️", "/admin/departments"),
            new Feature("MANAGE_LEAVES", "Manage Leaves", "Administration", "Approve and manage leave requests", "🌴", "/admin/leaves"),
            new Feature("MANAGE_PAYROLL", "Manage Payroll", "Administration", "Process and manage payroll", "💳", "/admin/payroll"),
            new Feature("MANAGE_MEDIA", "Media Management", "Administration", "Upload and manage media files", "📁", "/admin/media"),
            new Feature("MANAGE_OFFICE_LOCATIONS", "Office Locations", "Administration", "Manage office locations", "🏢", "/admin/locations")
        );

        for (Feature feature : defaultFeatures) {
            if (featureRepository.findByFeatureKey(feature.getFeatureKey()).isEmpty()) {
                featureRepository.save(feature);
                System.out.println("Feature created: " + feature.getFeatureName());
            }
        }
    }
}
