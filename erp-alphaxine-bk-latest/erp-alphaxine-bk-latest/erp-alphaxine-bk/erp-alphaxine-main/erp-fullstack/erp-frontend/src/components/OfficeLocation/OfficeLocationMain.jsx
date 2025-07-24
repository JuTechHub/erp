import React from "react";
import { useNavigate } from "react-router-dom";

const OfficeLocationMain = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/superadmin/office-location/all");
  };

  const handleAddNew = () => {
    navigate("/superadmin/office-location/add");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Office Location Management</h1>
        <p className="text-gray-600">Manage office locations across your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* View All Locations Card */}
        <div 
          onClick={handleViewAll}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">View All Locations</h3>
              <p className="text-sm text-gray-600">Browse and manage existing office locations</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Click to view all office locations
            </div>
            <span className="text-blue-500">→</span>
          </div>
        </div>

        {/* Add New Location Card */}
        <div 
          onClick={handleAddNew}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Location</h3>
              <p className="text-sm text-gray-600">Create a new office location</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Click to add a new office location
            </div>
            <span className="text-green-500">→</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Locations</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Locations</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Inactive Locations</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocationMain;
