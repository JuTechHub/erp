import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Removed AdminSidebar and sidebarConfig imports

// Import Office Location components
import OfficeLocationMain from "./OfficeLocation/OfficeLocationMain";
import AllOfficeLocations from "./OfficeLocation/AllOfficeLocations";
import AddOfficeLocation from "./OfficeLocation/AddOfficeLocation";

// Import Master Data Config component
import MasterDataConfig from "./MasterDataConfig";

export default function HRDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  // Removed sidebarConfig and handleMenuItemClick

  const renderContent = () => {
    switch (currentView) {
      case "office-location-main":
        return <OfficeLocationMain />;
      case "office-location-all":
        return <AllOfficeLocations />;
      case "office-location-add":
        return <AddOfficeLocation />;
      default:
        return (
          <main className="p-6">
            {/* Welcome Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome to HR Dashboard!</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Employees</p>
                    <p className="text-3xl font-bold text-gray-900">No data as of yet</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Leaves</p>
                    <p className="text-3xl font-bold text-gray-900">No data as of yet</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Holidays</p>
                    <p className="text-3xl font-bold text-gray-900">No data as of yet</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Departments</p>
                    <p className="text-3xl font-bold text-gray-900">No data as of yet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Upcoming Holidays */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Holidays</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-500 text-white">
                        <th className="px-4 py-3 text-left text-sm font-medium">S No.</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Holiday Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Day</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-500" colSpan="4">No data as of yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* This Month Upcoming Birthdays */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">This Month Upcoming Birthdays</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-500 text-white">
                        <th className="px-4 py-3 text-left text-sm font-medium">S No.</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Employee Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-500" colSpan="3">No data as of yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bottom Section Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Leave Approval */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Pending Leave Approval</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-500 text-white">
                        <th className="px-4 py-3 text-left text-sm font-medium">Employee Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Apply Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-500" colSpan="4">No data as of yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Approved Leaves */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Approved Leaves</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-500 text-white">
                        <th className="px-4 py-3 text-left text-sm font-medium">Employee Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Apply Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-500" colSpan="3">No data as of yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Available Employee Leave */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Available Employee Leave</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <input 
                      type="text" 
                      placeholder="Search..."
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee Name</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Closed Available Leave</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Current Month Left</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Remaining Leave</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-500" colSpan="4">No data as of yet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-700">Showing 0 entries</span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/superadmin/dashboard-selection")}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 transition-colors"
            >
              ← Back to Modules
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              {currentView === "dashboard" ? "HR Dashboard" : 
               currentView === "office-location-main" ? "Office Location" :
               currentView === "office-location-all" ? "All Office Locations" :
               currentView === "office-location-add" ? "Add Office Location" : "HR Dashboard"}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">SA</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Content */}
      {renderContent()}
    </div>
  );
}
