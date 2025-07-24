import React, { useState } from "react";

const AdminSidebar = ({ 
  menuConfig, 
  logoConfig, 
  onMenuItemClick, 
  defaultActiveItem = null 
}) => {
  const [activeItem, setActiveItem] = useState(defaultActiveItem || menuConfig?.items?.[0]?.title || "");
  const [expandedItems, setExpandedItems] = useState({});

  const handleItemClick = (item) => {
    if (!item.isHeader) {
      setActiveItem(item.title);
      
      // Handle submenu expansion
      if (item.hasSubmenu) {
        setExpandedItems(prev => ({
          ...prev,
          [item.title]: !prev[item.title]
        }));
      }
      
      if (onMenuItemClick) {
        onMenuItemClick(item);
      }
    }
  };

  const handleSubItemClick = (subItem, parentItem) => {
    if (onMenuItemClick) {
      onMenuItemClick(subItem, parentItem);
    }
  };

  // Default logo config if not provided
  const defaultLogoConfig = {
    icon: "α",
    text: "ALPHAXINE",
    iconBgColor: "bg-red-500",
    iconTextColor: "text-white",
    textColor: "text-gray-800",
    showRegistered: true
  };

  const logo = { ...defaultLogoConfig, ...logoConfig };

  // Default menu items if not provided
  const defaultMenuItems = [
    {
      title: "Dashboard",
      icon: "📊",
      hasSubmenu: false,
      route: "/dashboard"
    },
    {
      title: "Content Management",
      isHeader: true,
    },
    {
      title: "Media",
      icon: "📁",
      hasSubmenu: true,
      route: "/media"
    },
    {
      title: "Master Management",
      isHeader: true,
    },
    {
      title: "Office Location",
      icon: "🏢",
      hasSubmenu: true,
      route: "/office-location"
    },
    {
      title: "Leave Type",
      icon: "📋",
      hasSubmenu: true,
      route: "/leave-type"
    },
    {
      title: "Department",
      icon: "🏛️",
      hasSubmenu: true,
      route: "/department"
    },
    {
      title: "Designation",
      icon: "👔",
      hasSubmenu: true,
      route: "/designation"
    },
    {
      title: "Employee",
      icon: "👥",
      hasSubmenu: true,
      route: "/employee"
    },
    {
      title: "Leave",
      icon: "🌴",
      hasSubmenu: true,
      route: "/leave"
    },
    {
      title: "Shift",
      icon: "⏰",
      hasSubmenu: true,
      route: "/shift"
    },
    {
      title: "Payroll Component",
      icon: "💰",
      hasSubmenu: true,
      route: "/payroll-component"
    },
    {
      title: "Payroll",
      icon: "💳",
      hasSubmenu: true,
      route: "/payroll"
    },
    {
      title: "Holiday",
      icon: "🎉",
      hasSubmenu: true,
      route: "/holiday"
    },
    {
      title: "Attendance",
      icon: "✅",
      hasSubmenu: true,
      route: "/attendance"
    },
    {
      title: "Apply Leave",
      icon: "📝",
      hasSubmenu: true,
      route: "/apply-leave"
    },
  ];

  const menuItems = menuConfig?.items || defaultMenuItems;

  return (
    <div className={`w-64 bg-white shadow-lg h-screen overflow-y-auto border-r border-gray-200 ${menuConfig?.sidebarClass || ''}`}>
      {/* Logo/Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 ${logo.iconBgColor} rounded flex items-center justify-center`}>
            <span className={`${logo.iconTextColor} font-bold text-sm`}>{logo.icon}</span>
          </div>
          <span className={`font-semibold ${logo.textColor} text-sm`}>{logo.text}</span>
          {logo.showRegistered && <span className="text-xs text-gray-400">®</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-2">
        {menuItems.map((item, index) => {
          if (item.isHeader) {
            return (
              <div
                key={`header-${index}`}
                className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4"
              >
                {item.title}
              </div>
            );
          }

          const isActive = activeItem === item.title;
          const isExpanded = expandedItems[item.title];
          const baseClasses = "mx-2 mb-1 rounded-md cursor-pointer transition-colors duration-150";
          const activeClasses = item.activeClass || "bg-blue-50 border-l-4 border-blue-500";
          const hoverClasses = item.hoverClass || "hover:bg-gray-50";
          const itemClasses = `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;

          return (
            <div key={`item-${index}`}>
              <div
                className={itemClasses}
                onClick={() => handleItemClick(item)}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick(item);
                  }
                }}
              >
                <div className="flex items-center justify-between px-3 py-2.5">
                  <div className="flex items-center space-x-3">
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    <span
                      className={`text-sm font-medium ${
                        isActive
                          ? item.activeTextClass || "text-blue-700"
                          : item.textClass || "text-gray-700"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  {item.hasSubmenu && (
                    <span
                      className={`text-xs transition-transform duration-200 ${
                        isActive 
                          ? item.activeSubmenuIconClass || "text-blue-500" 
                          : item.submenuIconClass || "text-gray-400"
                      } ${isExpanded ? 'transform rotate-90' : ''}`}
                    >
                      {item.submenuIcon || "▶"}
                    </span>
                  )}
                </div>
              </div>

              {/* Submenu Items */}
              {item.hasSubmenu && isExpanded && item.subItems && (
                <div className="ml-4 mt-1 mb-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={`subitem-${index}-${subIndex}`}
                      className="mx-2 mb-1 rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-50"
                      onClick={() => handleSubItemClick(subItem, item)}
                    >
                      <div className="flex items-center px-3 py-2">
                        <span className="w-6 h-6 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          {subItem.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
