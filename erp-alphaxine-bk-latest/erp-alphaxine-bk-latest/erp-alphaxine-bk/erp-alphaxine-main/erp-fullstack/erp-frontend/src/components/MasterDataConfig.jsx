import React, { useState, useEffect } from "react";

const featureCategories = {
  "Dashboard & Profile": [
    { id: "dashboard", label: "Dashboard", icon: "📊", description: "View personal dashboard with key metrics" },
    { id: "profile", label: "My Profile", icon: "👤", description: "Manage personal information and settings" }
  ],
  "Attendance Management": [
    { id: "attendance-checkin", label: "Check In/Out", icon: "⏰", description: "Daily attendance check-in and check-out" },
    { id: "attendance-history", label: "Attendance History", icon: "📅", description: "View past attendance records" },
    { id: "attendance-reports", label: "Attendance Reports", icon: "📈", description: "Generate attendance reports" }
  ],
  "Leave Management": [
    { id: "apply-leave", label: "Apply Leave", icon: "📝", description: "Submit new leave requests" },
    { id: "leave-status", label: "Leave Status", icon: "🔍", description: "Track leave application status" },
    { id: "leave-balance", label: "Leave Balance", icon: "⚖️", description: "View available leave balance" },
    { id: "leave-calendar", label: "Leave Calendar", icon: "📆", description: "View team leave calendar" }
  ],
  "Payroll & Finance": [
    { id: "payroll-slip", label: "Pay Slips", icon: "💰", description: "Download and view pay slips" },
    { id: "payroll-history", label: "Payroll History", icon: "📊", description: "View salary history and details" },
    { id: "tax-documents", label: "Tax Documents", icon: "📄", description: "Access tax-related documents" }
  ],
  "Company Information": [
    { id: "holiday-calendar", label: "Holiday Calendar", icon: "🎉", description: "View company holidays" },
    { id: "announcements", label: "Announcements", icon: "📢", description: "Company news and updates" },
    { id: "employee-directory", label: "Employee Directory", icon: "👥", description: "Company employee contacts" }
  ],
  "Claims & Collections": [
    { id: "claims", label: "My Claims", icon: "📋", description: "Manage expense claims and requests" },
    { id: "collections", label: "My Collections", icon: "💳", description: "View collection records and status" }
  ]
};

export default function MasterDataConfig() {
  const [employees, setEmployees] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featureCategories, setFeatureCategories] = useState({});
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [access, setAccess] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Get current admin user ID from localStorage
  const getCurrentAdminId = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id;
    }
    return 1; // fallback to admin ID
  };

  // Fetch employees and features from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if backend is running first
        const healthCheck = await fetch('http://localhost:8080/api/rbac/features').catch(() => null);
        if (!healthCheck) {
          console.error('Backend not accessible. Please ensure the backend is running on port 8080.');
          setLoading(false);
          return;
        }

        // Fetch employees
        console.log('Fetching employees...');
        const employeesResponse = await fetch('http://localhost:8080/api/rbac/users');
        if (!employeesResponse.ok) {
          throw new Error(`Failed to fetch employees: ${employeesResponse.status}`);
        }
        const employeesData = await employeesResponse.json();
        console.log('Employees data:', employeesData);
        setEmployees(employeesData);
        
        // Debug: Also fetch all users to see what's in database
        const debugResponse = await fetch('http://localhost:8080/api/rbac/debug/all-users');
        if (debugResponse.ok) {
          const debugData = await debugResponse.json();
          console.log('All users in database:', debugData);
        }
        
        // Fetch features
        console.log('Fetching features...');
        const featuresResponse = await fetch('http://localhost:8080/api/rbac/features');
        if (!featuresResponse.ok) {
          throw new Error(`Failed to fetch features: ${featuresResponse.status}`);
        }
        const featuresData = await featuresResponse.json();
        console.log('Features data:', featuresData);
        setFeatures(featuresData);
        
        // If no features exist, initialize with default features
        if (featuresData.length === 0) {
          console.log('No features found, initializing default features...');
          await initializeDefaultFeatures();
          // Retry fetching features
          const retryResponse = await fetch('http://localhost:8080/api/rbac/features');
          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            setFeatures(retryData);
            groupFeaturesByCategory(retryData);
          }
        } else {
          groupFeaturesByCategory(featuresData);
        }
        
        // Set first employee as selected
        if (employeesData.length > 0) {
          setSelectedEmp(employeesData[0].id);
          // Fetch permissions for first employee
          fetchUserPermissions(employeesData[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Show more detailed error message
        setSavedMessage(`❌ Error: ${error.message}. Please ensure backend is running on port 8080.`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to group features by category
  const groupFeaturesByCategory = (featuresData) => {
    const grouped = featuresData.reduce((acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = [];
      }
      acc[feature.category].push({
        id: feature.featureKey,
        label: feature.featureName,
        icon: feature.icon || "📄",
        description: feature.description || "Feature access"
      });
      return acc;
    }, {});
    setFeatureCategories(grouped);
  };

  // Initialize default features if none exist
  const initializeDefaultFeatures = async () => {
    const defaultFeatures = [
      // Dashboard & Profile
      { featureKey: "VIEW_DASHBOARD", featureName: "Dashboard", category: "Dashboard & Profile", description: "View personal dashboard with key metrics", icon: "📊" },
      { featureKey: "VIEW_PROFILE", featureName: "My Profile", category: "Dashboard & Profile", description: "Manage personal information and settings", icon: "👤" },
      
      // Attendance Management
      { featureKey: "VIEW_ATTENDANCE", featureName: "Check In/Out", category: "Attendance Management", description: "Daily attendance check-in and check-out", icon: "⏰" },
      { featureKey: "VIEW_ATTENDANCE_HISTORY", featureName: "Attendance History", category: "Attendance Management", description: "View past attendance records", icon: "📅" },
      { featureKey: "VIEW_ATTENDANCE_REPORTS", featureName: "Attendance Reports", category: "Attendance Management", description: "Generate attendance reports", icon: "📈" },
      
      // Leave Management
      { featureKey: "APPLY_LEAVE", featureName: "Apply Leave", category: "Leave Management", description: "Submit new leave requests", icon: "📝" },
      { featureKey: "VIEW_LEAVE_STATUS", featureName: "Leave Status", category: "Leave Management", description: "Track leave application status", icon: "🔍" },
      { featureKey: "VIEW_LEAVE_BALANCE", featureName: "Leave Balance", category: "Leave Management", description: "View available leave balance", icon: "⚖️" },
      { featureKey: "VIEW_LEAVE_CALENDAR", featureName: "Leave Calendar", category: "Leave Management", description: "View team leave calendar", icon: "📆" },
      
      // Payroll & Finance
      { featureKey: "VIEW_PAYROLL", featureName: "Pay Slips", category: "Payroll & Finance", description: "Download and view pay slips", icon: "💰" },
      { featureKey: "VIEW_PAYROLL_HISTORY", featureName: "Payroll History", category: "Payroll & Finance", description: "View salary history and details", icon: "📊" },
      { featureKey: "VIEW_TAX_DOCUMENTS", featureName: "Tax Documents", category: "Payroll & Finance", description: "Access tax-related documents", icon: "📄" },
      
      // Company Information
      { featureKey: "VIEW_HOLIDAYS", featureName: "Holiday Calendar", category: "Company Information", description: "View company holidays", icon: "🎉" },
      { featureKey: "VIEW_ANNOUNCEMENTS", featureName: "Announcements", category: "Company Information", description: "Company news and updates", icon: "📢" },
      { featureKey: "VIEW_EMPLOYEE_DIRECTORY", featureName: "Employee Directory", category: "Company Information", description: "Company employee contacts", icon: "👥" },
      
      // Admin Features
      { featureKey: "MANAGE_EMPLOYEES", featureName: "Manage Employees", category: "Administration", description: "Add, edit, and manage employees", icon: "👥" },
      { featureKey: "MANAGE_DEPARTMENTS", featureName: "Manage Departments", category: "Administration", description: "Manage company departments", icon: "🏛️" },
      { featureKey: "MANAGE_LEAVES", featureName: "Manage Leaves", category: "Administration", description: "Approve and manage leave requests", icon: "🌴" },
      { featureKey: "MANAGE_PAYROLL", featureName: "Manage Payroll", category: "Administration", description: "Process and manage payroll", icon: "💳" }
    ];

    try {
      for (const feature of defaultFeatures) {
        await fetch('http://localhost:8080/api/rbac/features', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feature)
        });
      }
      console.log('Default features initialized');
    } catch (error) {
      console.error('Error initializing default features:', error);
    }
  };

  // Fetch user permissions
  const fetchUserPermissions = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/rbac/permissions/${userId}`);
      const permissions = await response.json();
      setAccess(prev => ({ ...prev, [userId]: permissions }));
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  // Handle employee selection
  const handleEmployeeSelect = (empId) => {
    setSelectedEmp(empId);
    if (!access[empId]) {
      fetchUserPermissions(empId);
    }
  };

  const handleFeatureChange = (featureId) => {
    setAccess((prev) => {
      const empAccess = prev[selectedEmp] || [];
      if (empAccess.includes(featureId)) {
        return { ...prev, [selectedEmp]: empAccess.filter((f) => f !== featureId) };
      } else {
        return { ...prev, [selectedEmp]: [...empAccess, featureId] };
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      const empAccess = access[selectedEmp] || [];
      const adminId = getCurrentAdminId();
      
      const response = await fetch(`http://localhost:8080/api/rbac/permissions/${selectedEmp}?grantedBy=${adminId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empAccess)
      });
      
      if (response.ok) {
        setSavedMessage("✅ Permissions saved successfully!");
      } else {
        setSavedMessage("❌ Error saving permissions");
      }
    } catch (error) {
      console.error('Error saving permissions:', error);
      setSavedMessage("❌ Error saving permissions");
    }
    
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const getSelectedEmployee = () => employees.find(emp => emp.id === selectedEmp);
  const empAccess = access[selectedEmp] || [];
  const totalFeatures = Object.values(featureCategories).flat().length;
  const accessCount = empAccess.length;

  const filteredEmployees = employees.filter(emp => 
    emp.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading employee and feature data...</p>
          <p className="mt-2 text-sm text-gray-500">Connecting to backend server...</p>
        </div>
      </div>
    );
  }

  // Show error message if there's an issue
  if (savedMessage && savedMessage.includes('❌ Error:')) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-red-50 to-pink-100 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Connection Error</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {savedMessage}
          </div>
          <div className="text-left bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Ensure your backend server is running</li>
              <li>Check if the server is running on port 8080</li>
              <li>Verify your database connection</li>
              <li>Check the browser console for detailed errors</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            🔄 Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🔐 Master Data Config</h1>
        <p className="text-lg text-gray-600">Configure employee access permissions and sidebar features</p>
      </div>

      {/* Employee Selection Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          👥 Select Employee
        </h2>
        
        {/* Search Bar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search & Select Employee</label>
          <select
            value={selectedEmp || ''}
            onChange={(e) => handleEmployeeSelect(Number(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
          >
            <option value="">🔍 Select an employee...</option>
            {filteredEmployees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName || emp.username} ({emp.employeeId || emp.username}) - {emp.role}
              </option>
            ))}
          </select>
        </div>

        {/* Show message if no employees found */}
        {employees.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">No employees found!</p>
            <p className="text-sm">Please ensure you have employee records in your database with role 'EMPLOYEE'.</p>
          </div>
        )}

        {/* Selected Employee Summary */}
        {getSelectedEmployee() && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{getSelectedEmployee().fullName || getSelectedEmployee().username}</h3>
                <p className="opacity-90">
                  {getSelectedEmployee().employeeId && `ID: ${getSelectedEmployee().employeeId} • `}
                  {getSelectedEmployee().role} • 
                  {getSelectedEmployee().department && ` ${getSelectedEmployee().department}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{accessCount}/{totalFeatures}</div>
                <div className="text-sm opacity-90">Features Enabled</div>
              </div>
            </div>
            <div className="mt-2 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${totalFeatures > 0 ? (accessCount / totalFeatures) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Permissions Configuration */}
      {selectedEmp && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              ⚙️ Feature Permissions for {getSelectedEmployee()?.username}
            </h2>
            <button
              onClick={handleSaveChanges}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>💾</span>
              <span>Save Changes</span>
            </button>
          </div>

          {savedMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-xl">
              {savedMessage}
            </div>
          )}

          {/* Feature Categories */}
          <div className="space-y-6">
            {Object.entries(featureCategories).map(([category, features]) => {
              const categoryFeatures = features.map(f => f.id);
              const enabledInCategory = categoryFeatures.filter(fId => empAccess.includes(fId)).length;
              
              return (
                <div key={category} className="border-2 border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {enabledInCategory}/{categoryFeatures.length} enabled
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                          style={{ width: `${categoryFeatures.length > 0 ? (enabledInCategory / categoryFeatures.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature) => {
                      const isEnabled = empAccess.includes(feature.id);
                      return (
                        <label 
                          key={feature.id} 
                          className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                            isEnabled 
                              ? 'border-green-300 bg-green-50' 
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={() => handleFeatureChange(feature.id)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                              isEnabled 
                                ? 'border-green-500 bg-green-500' 
                                : 'border-gray-300 bg-white'
                            }`}>
                              {isEnabled && (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xl">{feature.icon}</span>
                              <span className="font-medium text-gray-800">{feature.label}</span>
                            </div>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center space-x-2 text-blue-700">
              <span>ℹ️</span>
              <span className="font-medium">Note:</span>
            </div>
            <p className="text-blue-600 text-sm mt-1">
              Changes made here will dynamically update the employee's sidebar and available features upon their next login. 
              All permissions are saved in real-time and can be modified at any time.
            </p>
          </div>
        </div>
      )}

      {/* No Employee Selected Message */}
      {!selectedEmp && (
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Select an Employee</h2>
          <p className="text-gray-500">Please select an employee from the dropdown above to configure their feature permissions.</p>
        </div>
      )}
    </div>
  );
}