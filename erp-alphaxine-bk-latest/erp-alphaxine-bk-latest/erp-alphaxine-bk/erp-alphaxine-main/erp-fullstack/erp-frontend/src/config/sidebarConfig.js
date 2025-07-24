// Sidebar configuration for different user roles
export const sidebarConfigs = {
  SUPER_ADMIN: {
    logoConfig: {
      icon: "α",
      text: "ALPHAXINE",
      iconBgColor: "bg-red-500",
      iconTextColor: "text-white",
      textColor: "text-gray-800",
      showRegistered: true
    },
    menuConfig: {
      items: [
        {
          id: "dashboard",
          title: "Dashboard",
          hasSubmenu: false,
          route: "/superadmin/dashboard",
          permissions: ["VIEW_DASHBOARD"]
        },
        {
          id: "content-management-header",
          title: "Content Management",
          isHeader: true,
        },
        {
          id: "media",
          title: "Media",
          hasSubmenu: true,
          route: "/superadmin/media",
          permissions: ["MANAGE_MEDIA"],
          subItems: [
            { id: "media-upload", title: "Upload", route: "/superadmin/media/upload" },
            { id: "media-gallery", title: "Gallery", route: "/superadmin/media/gallery" }
          ]
        },
        {
          id: "master-management-header",
          title: "Master Management",
          isHeader: true,
        },
        {
          id: "office-location",
          title: "Office Location",
          hasSubmenu: true,
          route: "/superadmin/office-location",
          permissions: ["MANAGE_OFFICE_LOCATIONS"],
          subItems: [
            { id: "location-all", title: "All Locations", route: "/superadmin/office-location/all" },
            { id: "location-add", title: "Add Location", route: "/superadmin/office-location/add" }
          ]
        },
        {
          id: "leave-type",
          title: "Leave Type",
          hasSubmenu: true,
          route: "/superadmin/leave-type",
          permissions: ["MANAGE_LEAVE_TYPES"],
          subItems: [
            { id: "leave-type-list", title: "View Types", route: "/superadmin/leave-type/list" },
            { id: "leave-type-add", title: "Add Type", route: "/superadmin/leave-type/add" }
          ]
        },
        {
          id: "department",
          title: "Department",
          hasSubmenu: true,
          route: "/superadmin/department",
          permissions: ["MANAGE_DEPARTMENTS"],
          subItems: [
            { id: "dept-list", title: "View Departments", route: "/superadmin/department/list" },
            { id: "dept-add", title: "Add Department", route: "/superadmin/department/add" }
          ]
        },
        {
          id: "designation",
          title: "Designation",
          hasSubmenu: true,
          route: "/superadmin/designation",
          permissions: ["MANAGE_DESIGNATIONS"],
          subItems: [
            { id: "desig-list", title: "View Designations", route: "/superadmin/designation/list" },
            { id: "desig-add", title: "Add Designation", route: "/superadmin/designation/add" }
          ]
        },
        {
          id: "employee",
          title: "Employee",
          hasSubmenu: true,
          route: "/superadmin/employee",
          permissions: ["MANAGE_EMPLOYEES"],
          subItems: [
            { id: "emp-list", title: "View Employees", route: "/superadmin/employee/list" },
            { id: "emp-add", title: "Add Employee", route: "/superadmin/employee/add" }
          ]
        },
        {
          id: "leave",
          title: "Leave",
          hasSubmenu: true,
          route: "/superadmin/leave",
          permissions: ["MANAGE_LEAVES"],
          subItems: [
            { id: "leave-requests", title: "Leave Requests", route: "/superadmin/leave/requests" },
            { id: "leave-calendar", title: "Leave Calendar", route: "/superadmin/leave/calendar" },
            { id: "leave-reports", title: "Leave Reports", route: "/superadmin/leave/reports" }
          ]
        },
        {
          id: "shift",
          title: "Shift",
          hasSubmenu: true,
          route: "/superadmin/shift",
          permissions: ["MANAGE_SHIFTS"],
          subItems: [
            { id: "shift-list", title: "View Shifts", route: "/superadmin/shift/list" },
            { id: "shift-add", title: "Add Shift", route: "/superadmin/shift/add" },
            { id: "shift-assign", title: "Assign Shifts", route: "/superadmin/shift/assign" }
          ]
        },
        {
          id: "payroll-component",
          title: "Payroll Component",
          hasSubmenu: true,
          route: "/superadmin/payroll-component",
          permissions: ["MANAGE_PAYROLL_COMPONENTS"],
          subItems: [
            { id: "component-list", title: "View Components", route: "/superadmin/payroll-component/list" },
            { id: "component-add", title: "Add Component", route: "/superadmin/payroll-component/add" }
          ]
        },
        {
          id: "payroll",
          title: "Payroll",
          hasSubmenu: true,
          route: "/superadmin/payroll",
          permissions: ["MANAGE_PAYROLL"],
          subItems: [
            { id: "payroll-generate", title: "Generate Payroll", route: "/superadmin/payroll/generate" },
            { id: "payroll-history", title: "Payroll History", route: "/superadmin/payroll/history" },
            { id: "payroll-add", title: "Payroll Add", route: "/superadmin/payroll/add" }
          ]
        },
        {
          id: "holiday",
          title: "Holiday",
          hasSubmenu: true,
          route: "/superadmin/holiday",
          permissions: ["MANAGE_HOLIDAYS"],
          subItems: [
            { id: "holiday-list", title: "View Holidays", route: "/superadmin/holiday/list" },
            { id: "holiday-calendar", title: "Holiday Calendar", route: "/superadmin/holiday/calendar" }
          ]
        },
        {
          id: "attendance",
          title: "Attendance",
          hasSubmenu: true,
          route: "/superadmin/attendance",
          permissions: ["MANAGE_ATTENDANCE"],
          subItems: [
            { id: "attendance-view", title: "View Attendance", route: "/superadmin/attendance/view" },
            { id: "attendance-reports-graphs", title: "Attendance Reports & Graphs", route: "/superadmin/attendance/reports-graphs" },
            { id: "attendance-log", title: "Employee Attendance Log", route: "/superadmin/attendance/log" },
            { id: "attendance-approval", title: "Attendance Approval", route: "/superadmin/attendance/approval" }
          ]
        },
        {
          id: "apply-leave",
          title: "Apply Leave",
          hasSubmenu: true,
          route: "/superadmin/apply-leave",
          permissions: ["APPLY_LEAVE"],
          subItems: [
            { id: "leave-apply", title: "Apply for Leave", route: "/superadmin/apply-leave/new" },
            { id: "leave-status", title: "Leave Status", route: "/superadmin/apply-leave/status" }
          ]
        },
        {
          id: "claims-collections",
          title: "Claims & Collections",
          hasSubmenu: true,
          route: "/superadmin/claims-collections",
          permissions: ["MANAGE_CLAIMS_COLLECTIONS"],
          subItems: [
            { id: "claims", title: "Claims", route: "/superadmin/claims" },
            { id: "collections", title: "Collections", route: "/superadmin/collections" }
          ]
        },
        {
          id: "master-data-config",
          title: "Master Data Config",
          hasSubmenu: false,
          route: "/superadmin/master-data-config",
          permissions: ["MANAGE_EMPLOYEES"]
        },
      ]
    }
  },
  
  EMPLOYEE: {
    logoConfig: {
      icon: "α",
      text: "ALPHAXINE",
      iconBgColor: "bg-blue-500",
      iconTextColor: "text-white",
      textColor: "text-gray-800",
      showRegistered: true
    },
    menuConfig: {
      items: [
        {
          id: "dashboard",
          title: "Dashboard",
          hasSubmenu: false,
          route: "/employee/dashboard",
          permissions: ["VIEW_DASHBOARD"]
        },
        {
          id: "my-profile",
          title: "My Profile",
          hasSubmenu: false,
          route: "/employee/profile",
          permissions: ["VIEW_PROFILE"]
        },
        {
          id: "attendance",
          title: "Attendance",
          hasSubmenu: true,
          route: "/employee/attendance",
          permissions: ["VIEW_ATTENDANCE"],
          subItems: [
            { id: "attendance-checkin", title: "Check In/Out", route: "/employee/attendance/checkin", permissions: ["VIEW_ATTENDANCE"] },
            { id: "attendance-history", title: "My Attendance", route: "/employee/attendance/history", permissions: ["VIEW_ATTENDANCE"] },
            { id: "attendance-reports", title: "Attendance Reports", route: "/employee/attendance/reports", permissions: ["VIEW_ATTENDANCE"] }
          ]
        },
        {
          id: "leave",
          title: "Leave",
          hasSubmenu: true,
          route: "/employee/leave",
          permissions: ["APPLY_LEAVE"],
          subItems: [
            { id: "leave-apply", title: "Apply Leave", route: "/employee/leave/apply", permissions: ["APPLY_LEAVE"] },
            { id: "leave-status", title: "Leave Status", route: "/employee/leave/status", permissions: ["APPLY_LEAVE"] },
            { id: "leave-balance", title: "Leave Balance", route: "/employee/leave/balance", permissions: ["APPLY_LEAVE"] },
            { id: "leave-calendar", title: "Leave Calendar", route: "/employee/leave/calendar", permissions: ["VIEW_LEAVE_CALENDAR"] }
          ]
        },
        {
          id: "payroll",
          title: "Payroll",
          hasSubmenu: true,
          route: "/employee/payroll",
          permissions: ["VIEW_PAYROLL"],
          subItems: [
            { id: "payroll-slip", title: "Pay Slip", route: "/employee/payroll/slip", permissions: ["VIEW_PAYROLL"] },
            { id: "payroll-history", title: "Payroll History", route: "/employee/payroll/history", permissions: ["VIEW_PAYROLL"] },
            { id: "tax-documents", title: "Tax Documents", route: "/employee/payroll/tax", permissions: ["VIEW_TAX_DOCUMENTS"] }
          ]
        },
        {
          id: "company-info",
          title: "Company Info",
          hasSubmenu: true,
          route: "/employee/company",
          permissions: ["VIEW_HOLIDAYS", "VIEW_ANNOUNCEMENTS", "VIEW_EMPLOYEE_DIRECTORY"],
          subItems: [
            { id: "holiday-calendar", title: "Holiday Calendar", route: "/employee/holidays", permissions: ["VIEW_HOLIDAYS"] },
            { id: "announcements", title: "Announcements", route: "/employee/announcements", permissions: ["VIEW_ANNOUNCEMENTS"] },
            { id: "employee-directory", title: "Employee Directory", route: "/employee/directory", permissions: ["VIEW_EMPLOYEE_DIRECTORY"] }
          ]
        },
        {
          id: "claims-collections",
          title: "Claims & Collections",
          hasSubmenu: true,
          route: "/employee/claims-collections",
          permissions: ["VIEW_CLAIMS_COLLECTIONS"],
          subItems: [
            { id: "my-claims", title: "My Claims", route: "/employee/claims", permissions: ["VIEW_CLAIMS_COLLECTIONS"] },
            { id: "my-collections", title: "My Collections", route: "/employee/collections", permissions: ["VIEW_CLAIMS_COLLECTIONS"] }
          ]
        }
      ]
    }
  }
};

// Helper function to filter menu items based on user permissions
export const filterMenuByPermissions = (menuItems, userPermissions = []) => {
  return menuItems.filter(item => {
    if (item.isHeader) return true;
    if (!item.permissions) return true;
    
    // Check if user has any of the required permissions for this item
    const hasPermission = item.permissions.some(permission => userPermissions.includes(permission));
    
    if (!hasPermission) return false;
    
    // If item has subItems, filter them as well
    if (item.subItems) {
      const filteredSubItems = item.subItems.filter(subItem => {
        if (!subItem.permissions) return true;
        return subItem.permissions.some(permission => userPermissions.includes(permission));
      });
      
      // Only include parent item if it has at least one visible sub-item
      if (filteredSubItems.length > 0) {
        item.subItems = filteredSubItems;
        return true;
      }
      return false;
    }
    
    return true;
  }).map(item => ({
    ...item,
    // Ensure subItems are properly filtered
    ...(item.subItems && { subItems: item.subItems })
  }));
};

// Helper function to get sidebar config by role
export const getSidebarConfig = (role, userPermissions = []) => {
  const config = sidebarConfigs[role];
  if (!config) return sidebarConfigs.EMPLOYEE; // Default fallback
  
  // Filter menu items by permissions
  const filteredItems = filterMenuByPermissions(config.menuConfig.items, userPermissions);
  
  return {
    ...config,
    menuConfig: {
      ...config.menuConfig,
      items: filteredItems
    }
  };
};
