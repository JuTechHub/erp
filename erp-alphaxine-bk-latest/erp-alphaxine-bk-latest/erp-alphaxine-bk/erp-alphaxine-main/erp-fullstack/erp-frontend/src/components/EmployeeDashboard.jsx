import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [userFeatures, setUserFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
          navigate('/');
          return;
        }
        
        const currentUser = JSON.parse(userData);
        setUser(currentUser);
        
        // Fetch user's permitted features
        const response = await fetch(`http://localhost:8080/api/rbac/user-features/${currentUser.id}`);
        const features = await response.json();
        setUserFeatures(features);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user features:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleFeatureClick = (feature) => {
    if (feature.routePath) {
      navigate(feature.routePath);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  // Group features by category
  const groupedFeatures = userFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Welcome, {user?.username}</h1>
                <p className="text-sm text-gray-500">Employee Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.keys(groupedFeatures).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Features Available</h2>
            <p className="text-gray-500">Contact your administrator to get access to features.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedFeatures).map(([category, features]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      onClick={() => handleFeatureClick(feature)}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 hover:border-blue-300 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{feature.icon}</div>
                        <h3 className="font-semibold text-gray-800 mb-1">{feature.featureName}</h3>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl text-green-600 mb-1">{userFeatures.length}</div>
              <div className="text-sm text-green-700">Available Features</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl text-blue-600 mb-1">{Object.keys(groupedFeatures).length}</div>
              <div className="text-sm text-blue-700">Feature Categories</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl text-purple-600 mb-1">👤</div>
              <div className="text-sm text-purple-700">Employee Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
