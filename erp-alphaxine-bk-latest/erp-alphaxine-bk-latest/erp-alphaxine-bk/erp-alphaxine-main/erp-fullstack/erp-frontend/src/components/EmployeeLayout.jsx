import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useUserPermissions } from "../hooks/useUserPermissions";
import { generateSidebarFromFeatures } from "../services/sidebarService";

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const { permissions, loading, error } = useUserPermissions();
  const [sidebarConfig, setSidebarConfig] = useState(null);
  
  // Generate sidebar configuration based on allocated features
  useEffect(() => {
    if (!loading && permissions) {
      const config = generateSidebarFromFeatures(permissions);
      setSidebarConfig(config);
      console.log('Generated sidebar config for employee:', config);
      console.log('User permissions:', permissions);
    }
  }, [permissions, loading]);
  
  // Show loading state while fetching permissions
  if (loading || !sidebarConfig) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading permissions...</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if permissions failed to load
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-white shadow-lg flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="text-sm">Failed to load permissions</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-4">❌</div>
            <p className="text-gray-600">Unable to load your workspace</p>
            <p className="text-sm text-gray-500">Please contact your administrator</p>
          </div>
        </div>
      </div>
    );
  }

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
