import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUsers, 
  FaHandshake, 
  FaChartLine, 
  FaBoxes, 
  FaProjectDiagram, 
  FaChartBar,
  FaUserTie,
  FaCogs,
  FaShieldAlt,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";

export default function DashboardSelection() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const dashboardModules = [
    {
      id: "hr",
      title: "HR Dashboard",
      subtitle: "Human Resource Management",
      description: "Manage employees, leaves, payroll, attendance and all HR operations",
      gradient: "from-blue-500 to-blue-700",
      bgPattern: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      icon: FaUsers,
      features: ["Employee Management", "Leave Management", "Payroll System", "Attendance Tracking"],
      route: "/superadmin/hr-dashboard"
    },
    {
      id: "crm",
      title: "CRM Dashboard", 
      subtitle: "Customer Relationship Management",
      description: "Manage customers, leads, sales pipeline and customer interactions",
      gradient: "from-green-500 to-green-700",
      bgPattern: "bg-green-50",
      iconBg: "bg-green-100", 
      iconColor: "text-green-500",
      icon: FaHandshake,
      features: ["Lead Management", "Customer Database", "Sales Pipeline", "Communication Hub"],
      route: "/superadmin/crm-dashboard"
    },
    {
      id: "finance",
      title: "Trading Dashboard",
      subtitle: "Stock Analysis System", 
      description: "Handle trading and stock analysis operations",
      gradient: "from-purple-500 to-purple-700",
      bgPattern: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      icon: FaChartLine,
      features: ["Stock", "Trade Management", "Volume Tracking", "Financial Reports"],
      route: "/superadmin/finance-dashboard"
    },
    {
      id: "inventory",
      title: "Inventory Dashboard",
      subtitle: "Inventory Management System",
      description: "Manage products, stock levels, suppliers and warehouse operations",
      gradient: "from-orange-500 to-orange-700", 
      bgPattern: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      icon: FaBoxes,
      features: ["Product Management", "Stock Control", "Supplier Management", "Warehouse Ops"],
      route: "/superadmin/inventory-dashboard"
    },
    {
      id: "projects",
      title: "Project Dashboard",
      subtitle: "Project Management System",
      description: "Manage projects, tasks, timelines and team collaboration",
      gradient: "from-teal-500 to-teal-700",
      bgPattern: "bg-teal-50", 
      iconBg: "bg-teal-100",
      iconColor: "text-teal-500",
      icon: FaProjectDiagram,
      features: ["Project Planning", "Task Management", "Team Collaboration", "Progress Tracking"],
      route: "/superadmin/project-dashboard"
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      subtitle: "Business Intelligence & Reports",
      description: "Advanced analytics, reports and business intelligence insights",
      gradient: "from-indigo-500 to-indigo-700",
      bgPattern: "bg-indigo-50",
      iconBg: "bg-indigo-100", 
      iconColor: "text-indigo-500",
      icon: FaChartBar,
      features: ["Business Intelligence", "Custom Reports", "Data Visualization", "KPI Tracking"],
      route: "/superadmin/analytics-dashboard"
    }
  ];

  const handleDashboardSelect = (module) => {
    if (module.id === "hr") {
      navigate("/superadmin/dashboard");
    } else if (module.id === "finance") {
      window.open("http://127.0.0.1:5000/dashboard", "_blank");
    } else if (module.id === "crm") {
      navigate("/superadmin/crm-dashboard");
    } else {
      alert(`${module.title} - Coming Soon!`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">α</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ALPHAXINE ERP</h1>
                <p className="text-sm text-gray-600">Enterprise Resource Planning System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Welcome, Super Admin</p>
                <p className="text-xs text-gray-500">Choose your workspace</p>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Choose Your 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Workspace</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the module you want to work with. Each dashboard is designed to give you complete control 
            over different aspects of your business operations.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardModules.map((module) => (
            <div
              key={module.id}
              className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                hoveredCard === module.id ? 'shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredCard(module.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleDashboardSelect(module)}
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${module.bgPattern} opacity-50`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              
              {/* Card Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`w-16 h-16 ${module.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <module.icon className={`w-8 h-8 ${module.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{module.title}</h3>
                <p className="text-sm font-medium text-gray-600 mb-4">{module.subtitle}</p>
                
                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">{module.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {module.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button 
                  className={`w-full py-3 px-6 bg-gradient-to-r ${module.gradient} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDashboardSelect(module);
                  }}
                >
                  Access Dashboard
                </button>
              </div>

              {/* Hover Effect Overlay */}
              {hoveredCard === module.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <FaCogs className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">6</h4>
            <p className="text-gray-600">Active Modules</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <FaClock className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">24/7</h4>
            <p className="text-gray-600">System Uptime</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <FaCheckCircle className="w-6 h-6 text-purple-500" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">99.9%</h4>
            <p className="text-gray-600">Reliability</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <FaShieldAlt className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800">Secure</h4>
            <p className="text-gray-600">Data Protection</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-lg mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2025 ALPHAXINE ERP. All rights reserved. | Version 1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
