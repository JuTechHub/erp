import { useState, useEffect } from 'react';

// Custom hook to fetch user permissions
export const useUserPermissions = (userId) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get backend port from environment or default to 8080
        const backendPort = process.env.REACT_APP_BACKEND_PORT || '8080';
        const response = await fetch(`http://localhost:${backendPort}/api/rbac/permissions/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch permissions: ${response.status}`);
        }

        const userPermissions = await response.json();
        setPermissions(userPermissions || []);
      } catch (err) {
        console.error('Error fetching user permissions:', err);
        setError(err.message);
        // Set default permissions for employees if API fails
        setPermissions(['VIEW_DASHBOARD', 'VIEW_PROFILE']);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [userId]);

  return { permissions, loading, error };
};

// Custom hook to get current user data
export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('userData');
      const userRole = localStorage.getItem('userRole');
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } else if (userRole) {
        // Fallback if only role is available
        setUser({ role: userRole });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading };
};

// Helper function to map feature keys to permission names
export const mapFeaturesToPermissions = (features) => {
  const featureToPermissionMap = {
    // Dashboard & Profile
    'dashboard': 'VIEW_DASHBOARD',
    'profile': 'VIEW_PROFILE',
    
    // Attendance
    'attendance-checkin': 'VIEW_ATTENDANCE',
    'attendance-history': 'VIEW_ATTENDANCE', 
    'attendance-reports': 'VIEW_ATTENDANCE',
    
    // Leave Management
    'apply-leave': 'APPLY_LEAVE',
    'leave-status': 'APPLY_LEAVE',
    'leave-balance': 'APPLY_LEAVE',
    'leave-calendar': 'VIEW_LEAVE_CALENDAR',
    
    // Payroll
    'payroll-slip': 'VIEW_PAYROLL',
    'payroll-history': 'VIEW_PAYROLL',
    'tax-documents': 'VIEW_TAX_DOCUMENTS',
    
    // Company Info
    'holiday-calendar': 'VIEW_HOLIDAYS',
    'announcements': 'VIEW_ANNOUNCEMENTS',
    'employee-directory': 'VIEW_EMPLOYEE_DIRECTORY',

    // Claims & Collections
    'claims': 'VIEW_CLAIMS_COLLECTIONS',
    'collections': 'VIEW_CLAIMS_COLLECTIONS'
  };

  return features.map(feature => featureToPermissionMap[feature] || feature).filter(Boolean);
};
