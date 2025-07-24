import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const crmMenu = [
  { id: "leads", label: "Leads", route: "/superadmin/crm-dashboard/leads" },
  { id: "opportunities", label: "Opportunities", route: "/superadmin/crm-dashboard/opportunities" },
  { id: "accounts", label: "Accounts", route: "/superadmin/crm-dashboard/accounts" },
  { id: "proposals", label: "Proposals", route: "/superadmin/crm-dashboard/proposals" },
  { id: "analytics", label: "Analytics", route: "/superadmin/crm-dashboard/analytics" },
];

export default function CRMLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-green-700">CRM</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {crmMenu.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => navigate("/superadmin/dashboard-selection")}
            className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors">
            ← Back to Modules
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
} 