// API configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    // Get authentication token and user data from localStorage
    const authToken = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    // Add authentication header if token exists
    if (authToken && authToken !== 'demo-token') {
      headers['Authorization'] = `Bearer ${authToken}`;
    } else if (userData.username && userData.password) {
      // For basic auth, encode username:password
      const credentials = btoa(`${userData.username}:${userData.password}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle empty responses (like DELETE)
    if (response.status === 204) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Claims API
export const claimsAPI = {
  // Get all claims
  getAllClaims: () => apiRequest('/claims'),
  
  // Get claims by employee ID
  getClaimsByEmployee: (employeeId) => apiRequest(`/claims/employee/${employeeId}`),
  
  // Get pending claims
  getPendingClaims: () => apiRequest('/claims/pending'),
  
  // Get claims by status
  getClaimsByStatus: (status) => apiRequest(`/claims/status/${status}`),
  
  // Create new claim
  createClaim: (claim) => apiRequest('/claims', {
    method: 'POST',
    body: JSON.stringify(claim)
  }),
  
  // Update claim
  updateClaim: (id, claim) => apiRequest(`/claims/${id}`, {
    method: 'PUT',
    body: JSON.stringify(claim)
  }),
  
  // Approve claim
  approveClaim: (id, approvedBy) => apiRequest(`/claims/${id}/approve?approvedBy=${encodeURIComponent(approvedBy)}`, {
    method: 'PUT'
  }),
  
  // Reject claim
  rejectClaim: (id, rejectionReason) => apiRequest(`/claims/${id}/reject?rejectionReason=${encodeURIComponent(rejectionReason)}`, {
    method: 'PUT'
  }),
  
  // Delete claim
  deleteClaim: (id) => apiRequest(`/claims/${id}`, {
    method: 'DELETE'
  }),
  
  // Get claims statistics
  getClaimsStatistics: () => apiRequest('/claims/statistics')
};

// Collections API
export const collectionsAPI = {
  // Get all collections
  getAllCollections: () => apiRequest('/collections'),
  
  // Get collections by employee ID
  getCollectionsByEmployee: (employeeId) => apiRequest(`/collections/employee/${employeeId}`),
  
  // Get active collections
  getActiveCollections: () => apiRequest('/collections/active'),
  
  // Get overdue collections
  getOverdueCollections: () => apiRequest('/collections/overdue'),
  
  // Get collections by status
  getCollectionsByStatus: (status) => apiRequest(`/collections/status/${status}`),
  
  // Create new collection
  createCollection: (collection) => apiRequest('/collections', {
    method: 'POST',
    body: JSON.stringify(collection)
  }),
  
  // Update collection
  updateCollection: (id, collection) => apiRequest(`/collections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(collection)
  }),
  
  // Record payment
  recordPayment: (id, amount) => apiRequest(`/collections/${id}/payment?amount=${amount}`, {
    method: 'PUT'
  }),
  
  // Complete collection
  completeCollection: (id) => apiRequest(`/collections/${id}/complete`, {
    method: 'PUT'
  }),
  
  // Delete collection
  deleteCollection: (id) => apiRequest(`/collections/${id}`, {
    method: 'DELETE'
  }),
  
  // Get collections statistics
  getCollectionsStatistics: () => apiRequest('/collections/statistics'),
  
  // Get employee outstanding amount
  getEmployeeOutstandingAmount: (employeeId) => apiRequest(`/collections/employee/${employeeId}/outstanding`)
};

// Utility functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'approved':
      return 'text-green-600 bg-green-100';
    case 'rejected':
      return 'text-red-600 bg-red-100';
    case 'active':
      return 'text-blue-600 bg-blue-100';
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'overdue':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
