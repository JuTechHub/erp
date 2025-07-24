import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { getSidebarConfig } from "../config/sidebarConfig";

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  // Get sidebar configuration for SUPER_ADMIN role
  const sidebarConfig = getSidebarConfig("SUPER_ADMIN", [
    "VIEW_DASHBOARD", 
    "MANAGE_MEDIA", 
    "MANAGE_OFFICE_LOCATIONS", 
    "MANAGE_LEAVE_TYPES", 
    "MANAGE_DEPARTMENTS", 
    "MANAGE_DESIGNATIONS", 
    "MANAGE_EMPLOYEES", 
    "MANAGE_LEAVES", 
    "MANAGE_SHIFTS", 
    "MANAGE_PAYROLL_COMPONENTS", 
    "MANAGE_PAYROLL", 
    "MANAGE_HOLIDAYS", 
    "MANAGE_ATTENDANCE", 
    "APPLY_LEAVE",
    "MANAGE_CLAIMS_COLLECTIONS"
  ]);

  // Sidebar click handler for navigation
  const handleMenuItemClick = (item, parentItem) => {
    // Only navigate if the item does NOT have a submenu
    if (!item.hasSubmenu && item.route) {
      navigate(item.route);
    }
    // If it has a submenu, let AdminSidebar handle expansion
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar 
        logoConfig={sidebarConfig.logoConfig}
        menuConfig={sidebarConfig.menuConfig}
        onMenuItemClick={handleMenuItemClick}
      />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
