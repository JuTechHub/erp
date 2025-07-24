import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaFileDownload, FaFilter, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { claimsAPI, formatCurrency, formatDate, getStatusColor } from '../../services/apiService';

const ClaimsMain = () => {
  const [claims, setClaims] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);
  const [filter, setFilter] = useState('all');
  const [userRole, setUserRole] = useState('employee');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentEmployeeId, setCurrentEmployeeId] = useState('EMP001');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingClaim, setViewingClaim] = useState(null);

  useEffect(() => {
    loadClaims();
    // Get user role from localStorage or context
    const role = localStorage.getItem('userRole') || 'employee';
    setUserRole(role);
    // Get current employee ID from localStorage
    const empId = localStorage.getItem('employeeId') || 'EMP001';
    setCurrentEmployeeId(empId);
  }, []);

  const loadClaims = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userRole = localStorage.getItem('userRole') || 'employee';
      const empId = localStorage.getItem('employeeId') || 'EMP001';
      
      let claimsData;
      if (userRole === 'admin' || userRole === 'SUPER_ADMIN') {
        claimsData = await claimsAPI.getAllClaims();
      } else {
        claimsData = await claimsAPI.getClaimsByEmployee(empId);
      }
      
      setClaims(claimsData);
    } catch (err) {
      setError('Failed to load claims. Please try again.');
      console.error('Error loading claims:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClaim = () => {
    setShowAddForm(true);
    setEditingClaim(null);
  };

  const handleEditClaim = (claim) => {
    setEditingClaim(claim);
    setShowAddForm(true);
  };

  const handleViewClaim = (claim) => {
    setViewingClaim(claim);
    setShowViewModal(true);
  };

  const handleDeleteClaim = async (claimId) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      try {
        await claimsAPI.deleteClaim(claimId);
        setClaims(claims.filter(claim => claim.id !== claimId));
        setError('');
      } catch (err) {
        setError('Failed to delete claim. Please try again.');
        console.error('Error deleting claim:', err);
      }
    }
  };

  const handleApprovalToggle = async (claimId, newStatus) => {
    try {
      let updatedClaim;
      if (newStatus === 'approved') {
        updatedClaim = await claimsAPI.approveClaim(claimId, 'Admin');
      } else if (newStatus === 'rejected') {
        const reason = prompt('Please provide a reason for rejection:');
        if (!reason) return;
        updatedClaim = await claimsAPI.rejectClaim(claimId, reason);
      }
      
      setClaims(claims.map(claim => 
        claim.id === claimId ? updatedClaim : claim
      ));
      setError('');
    } catch (err) {
      setError('Failed to update claim status. Please try again.');
      console.error('Error updating claim:', err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setError('');
      
      if (editingClaim) {
        const updatedClaim = await claimsAPI.updateClaim(editingClaim.id, formData);
        setClaims(claims.map(claim => 
          claim.id === editingClaim.id ? updatedClaim : claim
        ));
      } else {
        const newClaim = await claimsAPI.createClaim({
          ...formData,
          employeeId: currentEmployeeId,
          employeeName: 'Current User' // TODO: Get from user context
        });
        setClaims([newClaim, ...claims]);
      }
      
      setShowAddForm(false);
      setEditingClaim(null);
    } catch (err) {
      setError('Failed to save claim. Please try again.');
      console.error('Error saving claim:', err);
    }
  };

  const filteredClaims = claims.filter(claim => {
    if (filter === 'all') return true;
    return claim.status?.toLowerCase() === filter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    const statusClass = getStatusColor(status);
    return `px-3 py-1 rounded-full text-sm font-medium border ${statusClass}`;
  };

  const getClaimTypeLabel = (type) => {
    const typeLabels = {
      NIGHT_SHIFT: 'Night Shift',
      TRANSPORT: 'Transport',
      OFFICE_SUPPLIES: 'Office Supplies'
    };
    return typeLabels[type] || type;
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <FaSpinner className="animate-spin text-blue-600" />
          <span>Loading claims...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Claims Management</h1>
              <p className="text-gray-600 mt-2">Manage reimbursement claims and approvals</p>
            </div>
            <button
              onClick={handleAddClaim}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus /> Add New Claim
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4">
            <FaFilter className="text-gray-500" />
            <span className="text-gray-700 font-medium">Filter by Status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Claims</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClaims.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No claims found
                    </td>
                  </tr>
                ) : (
                  filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(claim.claimDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {claim.officeLocation || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {claim.employeeName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {claim.employeeId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {getClaimTypeLabel(claim.claimType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(claim.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(claim.status)}>
                          {claim.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewClaim(claim)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {(userRole === 'admin' || userRole === 'SUPER_ADMIN' || claim.employeeId === currentEmployeeId) && (
                            <>
                              <button
                                onClick={() => handleEditClaim(claim)}
                                className="text-green-600 hover:text-green-900"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteClaim(claim.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                          {(userRole === 'admin' || userRole === 'SUPER_ADMIN') && claim.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApprovalToggle(claim.id, 'approved')}
                                className="text-green-600 hover:text-green-900"
                                title="Approve"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleApprovalToggle(claim.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                                title="Reject"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <ClaimFormModal
            claim={editingClaim}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setShowAddForm(false);
              setEditingClaim(null);
            }}
          />
        )}

        {/* View Modal */}
        {showViewModal && viewingClaim && (
          <ClaimViewModal
            claim={viewingClaim}
            onClose={() => {
              setShowViewModal(false);
              setViewingClaim(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Claim Form Modal Component
const ClaimFormModal = ({ claim, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    claimType: claim?.claimType || 'NIGHT_SHIFT',
    claimDate: claim?.claimDate || new Date().toISOString().split('T')[0],
    officeLocation: claim?.officeLocation || '',
    amount: claim?.amount || '',
    description: claim?.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {claim ? 'Edit Claim' : 'Add New Claim'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Claim Type
            </label>
            <select
              value={formData.claimType}
              onChange={(e) => setFormData({...formData, claimType: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="NIGHT_SHIFT">Night Shift</option>
              <option value="TRANSPORT">Transport</option>
              <option value="OFFICE_SUPPLIES">Office Supplies</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Claim Date
            </label>
            <input
              type="date"
              value={formData.claimDate}
              onChange={(e) => setFormData({...formData, claimDate: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Office Location
            </label>
            <input
              type="text"
              value={formData.officeLocation}
              onChange={(e) => setFormData({...formData, officeLocation: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter office location"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value)})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter description"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              {claim ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Claim View Modal Component
const ClaimViewModal = ({ claim, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Claim Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee</label>
              <p className="text-sm text-gray-900">{claim.employeeName} ({claim.employeeId})</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Claim Type</label>
              <p className="text-sm text-gray-900">{claim.claimType}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Claim Date</label>
              <p className="text-sm text-gray-900">{formatDate(claim.claimDate)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <p className="text-sm text-gray-900">{formatCurrency(claim.amount)}</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Office Location</label>
            <p className="text-sm text-gray-900">{claim.officeLocation || 'N/A'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="text-sm text-gray-900">{claim.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
                {claim.status?.toUpperCase()}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Submitted Date</label>
              <p className="text-sm text-gray-900">{formatDate(claim.submittedDate)}</p>
            </div>
          </div>
          
          {claim.approvedDate && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Approved Date</label>
                <p className="text-sm text-gray-900">{formatDate(claim.approvedDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Approved By</label>
                <p className="text-sm text-gray-900">{claim.approvedBy}</p>
              </div>
            </div>
          )}
          
          {claim.rejectionReason && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
              <p className="text-sm text-gray-900">{claim.rejectionReason}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimsMain;
