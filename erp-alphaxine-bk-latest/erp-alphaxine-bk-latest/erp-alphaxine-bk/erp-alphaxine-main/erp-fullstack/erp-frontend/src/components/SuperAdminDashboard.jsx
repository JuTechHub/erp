import React, { useState } from "react";
// Removed AdminSidebar import
import { getSidebarConfig } from "../config/sidebarConfig";

// Import Office Location components
import OfficeLocationMain from "./OfficeLocation/OfficeLocationMain";
import AllOfficeLocations from "./OfficeLocation/AllOfficeLocations";
import AddOfficeLocation from "./OfficeLocation/AddOfficeLocation";
// Import Upload Media component
import UploadMedia from "./Media/UploadMedia";

export default function SuperAdminDashboard() {
  // Removed useNavigate and sidebarConfig
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome Super Admin!</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Employees</p>
                    <p className="text-3xl font-bold text-gray-900">16</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Leaves</p>
                    <p className="text-3xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Holidays</p>
                    <p className="text-3xl font-bold text-gray-900">7</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <div className="w-6 h-6 bg-orange-500 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase">Total Departments</p>
                    <p className="text-3xl font-bold text-gray-900">5</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
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
                        <td className="px-4 py-3 text-sm">1</td>
                        <td className="px-4 py-3 text-sm text-blue-600">Independence Day</td>
                        <td className="px-4 py-3 text-sm">Friday</td>
                        <td className="px-4 py-3 text-sm">15-Aug-2025</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">2</td>
                        <td className="px-4 py-3 text-sm text-blue-600">Diwali</td>
                        <td className="px-4 py-3 text-sm">Wednesday</td>
                        <td className="px-4 py-3 text-sm">01-Nov-2025</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">3</td>
                        <td className="px-4 py-3 text-sm text-blue-600">Dushehra</td>
                        <td className="px-4 py-3 text-sm">Thursday</td>
                        <td className="px-4 py-3 text-sm">02-Oct-2025</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">4</td>
                        <td className="px-4 py-3 text-sm text-blue-600">Gandhi Keki Puja</td>
                        <td className="px-4 py-3 text-sm">Monday</td>
                        <td className="px-4 py-3 text-sm">22-Oct-2025</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">5</td>
                        <td className="px-4 py-3 text-sm text-blue-600">Christmas</td>
                        <td className="px-4 py-3 text-sm">Thursday</td>
                        <td className="px-4 py-3 text-sm">25-Dec-2025</td>
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
                        <td className="px-4 py-3 text-sm">1</td>
                        <td className="px-4 py-3 text-sm text-blue-600">Jassim Mohammed</td>
                        <td className="px-4 py-3 text-sm">02-Jul-1994</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-500" colspan="3">No more birthdays this month</td>
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
                        <td className="px-4 py-3 text-sm text-blue-600">Shubham Shrimant - HR001</td>
                        <td className="px-4 py-3 text-sm">25 Feb, 2025 (1)</td>
                        <td className="px-4 py-3 text-sm">07-Feb-2025</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">View</button>
                            <button className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600">Reject</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Smiriti Adhyapak - HR002</td>
                        <td className="px-4 py-3 text-sm">25 Feb, 2025 (2)</td>
                        <td className="px-4 py-3 text-sm">10-Feb-2025</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">View</button>
                            <button className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600">Reject</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Smiriti Adhyapak - HR002</td>
                        <td className="px-4 py-3 text-sm">
                          <div>01-Jan-2025</div>
                          <div>29-Jan-2025 (1)</div>
                        </td>
                        <td className="px-4 py-3 text-sm">29-Jan-2025</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">View</button>
                            <button className="px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600">Reject</button>
                          </div>
                        </td>
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
                        <td className="px-4 py-3 text-sm text-gray-500" colspan="3">No upcoming approved leaves</td>
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
                        <td className="px-4 py-3 text-sm text-blue-600">Abibul Haq</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">28</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Bahitya Gupta</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">28</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Chowadi Tina</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">23</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Deepika Unoab</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">14</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Rachna Oatne</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">20</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Purvi Tachhar</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">29</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Ravi Camaro</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">18</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Bert Rex</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">27</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Samteany Muralii</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">24</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-blue-600">Samteany Deu</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">0</td>
                        <td className="px-4 py-3 text-sm text-center">28</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-700">Showing 1 to 10 of 16 entries</span>
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
          <h1 className="text-2xl font-semibold text-gray-800">
            {currentView === "dashboard" ? "Dashboard" : 
             currentView === "office-location-main" ? "Office Location" :
             currentView === "office-location-all" ? "All Office Locations" :
             currentView === "office-location-add" ? "Add Office Location" : "Dashboard"}
          </h1>
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
