// Service to map features to sidebar menu items
export const generateSidebarFromFeatures = (allocatedFeatures) => {
  // Feature to menu item mapping
  const featureToMenuMap = {
    // Dashboard & Profile
    'dashboard': {
      id: "dashboard",
      title: "Dashboard",
      icon: "📊",
      hasSubmenu: false,
      route: "/employee/dashboard"
    },
    'profile': {
      id: "my-profile",
      title: "My Profile", 
      icon: "👤",
      hasSubmenu: false,
      route: "/employee/profile"
    },
    
    // Attendance Management
    'attendance-checkin': {
      id: "attendance-checkin",
      title: "Check In/Out",
      icon: "⏰",
      hasSubmenu: false,
      route: "/employee/attendance/checkin"
    },
    'attendance-history': {
      id: "attendance-history", 
      title: "Attendance History",
      icon: "📅",
      hasSubmenu: false,
      route: "/employee/attendance/history"
    },
    'attendance-reports': {
      id: "attendance-reports",
      title: "Attendance Reports", 
      icon: "📈",
      hasSubmenu: false,
      route: "/employee/attendance/reports"
    },
    
    // Leave Management
    'apply-leave': {
      id: "apply-leave",
      title: "Apply Leave",
      icon: "📝", 
      hasSubmenu: false,
      route: "/employee/leave/apply"
    },
    'leave-status': {
      id: "leave-status",
      title: "Leave Status",
      icon: "🔍",
      hasSubmenu: false, 
      route: "/employee/leave/status"
    },
    'leave-balance': {
      id: "leave-balance",
      title: "Leave Balance",
      icon: "⚖️",
      hasSubmenu: false,
      route: "/employee/leave/balance"
    },
    'leave-calendar': {
      id: "leave-calendar", 
      title: "Leave Calendar",
      icon: "📆",
      hasSubmenu: false,
      route: "/employee/leave/calendar"
    },
    
    // Payroll & Finance
    'payroll-slip': {
      id: "payroll-slip",
      title: "Pay Slips",
      icon: "💰",
      hasSubmenu: false,
      route: "/employee/payroll/slip" 
    },
    'payroll-history': {
      id: "payroll-history",
      title: "Payroll History", 
      icon: "📊",
      hasSubmenu: false,
      route: "/employee/payroll/history"
    },
    'tax-documents': {
      id: "tax-documents",
      title: "Tax Documents",
      icon: "📄", 
      hasSubmenu: false,
      route: "/employee/payroll/tax"
    },
    
    // Company Information
    'holiday-calendar': {
      id: "holiday-calendar",
      title: "Holiday Calendar",
      icon: "🎉",
      hasSubmenu: false,
      route: "/employee/holidays"
    },
    'announcements': {
      id: "announcements", 
      title: "Announcements",
      icon: "📢",
      hasSubmenu: false,
      route: "/employee/announcements"
    },
    'employee-directory': {
      id: "employee-directory",
      title: "Employee Directory",
      icon: "👥",
      hasSubmenu: false, 
      route: "/employee/directory"
    },
    
    // Claims & Collections
    'claims': {
      id: "claims",
      title: "My Claims", 
      icon: "📋",
      hasSubmenu: false,
      route: "/employee/claims"
    },
    'collections': {
      id: "collections",
      title: "My Collections",
      icon: "💳",
      hasSubmenu: false,
      route: "/employee/collections"
    }
  };

  // Generate menu items based on allocated features
  const menuItems = [];
  
  // Always include dashboard and profile as defaults
  if (allocatedFeatures.includes('dashboard') || allocatedFeatures.length === 0) {
    menuItems.push(featureToMenuMap['dashboard']);
  }
  
  if (allocatedFeatures.includes('profile') || allocatedFeatures.length === 0) {
    menuItems.push(featureToMenuMap['profile']);
  }

  // Add other allocated features
  allocatedFeatures.forEach(featureKey => {
    if (featureKey !== 'dashboard' && featureKey !== 'profile' && featureToMenuMap[featureKey]) {
      menuItems.push(featureToMenuMap[featureKey]);
    }
  });

  return {
    logoConfig: {
      icon: "α",
      text: "ALPHAXINE",
      iconBgColor: "bg-blue-500",
      iconTextColor: "text-white",
      textColor: "text-gray-800",
      showRegistered: true
    },
    menuConfig: {
      items: menuItems
    }
  };
};
