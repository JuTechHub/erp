import { useState, useEffect } from 'react';

export const useUserPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const userData = localStorage.getItem('userData');
        if (!userData) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const userId = user.id;

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/rbac/permissions/${userId}`);
        if (response.ok) {
          const userPermissions = await response.json();
          setPermissions(userPermissions);
        } else {
          console.error('Failed to fetch permissions');
          setError('Failed to fetch permissions');
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setError('Error fetching permissions');
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  return { permissions, loading, error };
};
