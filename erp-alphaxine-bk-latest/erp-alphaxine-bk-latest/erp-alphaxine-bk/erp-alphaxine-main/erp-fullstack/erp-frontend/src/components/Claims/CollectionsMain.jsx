import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash, FaMoneyBill, FaFilter, FaSpinner } from 'react-icons/fa';
import { collectionsAPI, formatCurrency, formatDate, getStatusColor } from '../../services/apiService';

const CollectionsMain = () => {
  const [collections, setCollections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [filter, setFilter] = useState('all');
  const [userRole, setUserRole] = useState('employee');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentEmployeeId, setCurrentEmployeeId] = useState('EMP001');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingCollection, setViewingCollection] = useState(null);

  useEffect(() => {
    loadCollections();
    // Get user role from localStorage or context
    const role = localStorage.getItem('userRole') || 'employee';
    setUserRole(role);
    // Get current employee ID from localStorage
    const empId = localStorage.getItem('employeeId') || 'EMP001';
    setCurrentEmployeeId(empId);
  }, []);

  const loadCollections = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userRole = localStorage.getItem('userRole') || 'employee';
      const empId = localStorage.getItem('employeeId') || 'EMP001';
      
      let collectionsData;
      if (userRole === 'admin' || userRole === 'SUPER_ADMIN') {
        collectionsData = await collectionsAPI.getAllCollections();
      } else {
        collectionsData = await collectionsAPI.getCollectionsByEmployee(empId);
      }
      
      setCollections(collectionsData);
    } catch (err) {
      setError('Failed to load collections. Please try again.');
      console.error('Error loading collections:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollection = () => {
    setShowAddForm(true);
    setEditingCollection(null);
  };

  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setShowAddForm(true);
  };

  const handleViewCollection = (collection) => {
    setViewingCollection(collection);
    setShowViewModal(true);
  };

  const handleDeleteCollection = async (collectionId) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await collectionsAPI.deleteCollection(collectionId);
        setCollections(collections.filter(collection => collection.id !== collectionId));
        setError('');
      } catch (err) {
        setError('Failed to delete collection. Please try again.');
        console.error('Error deleting collection:', err);
      }
    }
  };

  const handleRecordPayment = async (collectionId) => {
    const amount = prompt('Enter payment amount:');
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

    try {
      const updatedCollection = await collectionsAPI.recordPayment(collectionId, parseFloat(amount));
      setCollections(collections.map(collection => 
        collection.id === collectionId ? updatedCollection : collection
      ));
      setError('');
    } catch (err) {
      setError('Failed to record payment. Please try again.');
      console.error('Error recording payment:', err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      setError('');
      
      if (editingCollection) {
        const updatedCollection = await collectionsAPI.updateCollection(editingCollection.id, formData);
        setCollections(collections.map(collection => 
          collection.id === editingCollection.id ? updatedCollection : collection
        ));
      } else {
        const newCollection = await collectionsAPI.createCollection({
          ...formData,
          employeeId: currentEmployeeId,
          employeeName: 'Current User' // TODO: Get from user context
        });
        setCollections([newCollection, ...collections]);
      }
      
      setShowAddForm(false);
      setEditingCollection(null);
    } catch (err) {
      setError('Failed to save collection. Please try again.');
      console.error('Error saving collection:', err);
    }
  };

  const filteredCollections = collections.filter(collection => {
    if (filter === 'all') return true;
    return collection.status?.toLowerCase() === filter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    const statusClass = getStatusColor(status);
    return `px-3 py-1 rounded-full text-sm font-medium border ${statusClass}`;
  };

  const getCollectionTypeLabel = (type) => {
    const typeLabels = {
      SALARY_ADVANCE: 'Salary Advance',
      EQUIPMENT_DAMAGE: 'Equipment Damage',
      LOAN: 'Loan',
      MISCELLANEOUS: 'Miscellaneous'
    };
    return typeLabels[type] || type;
  };

  const getProgressPercentage = (collection) => {
    if (!collection.totalAmount || collection.totalAmount === 0) return 0;
    const paid = collection.totalAmount - collection.remainingAmount;
    return Math.round((paid / collection.totalAmount) * 100);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <FaSpinner className="animate-spin text-blue-600" />
          <span>Loading collections...</span>
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
              <h1 className="text-3xl font-bold text-gray-800">Collections Management</h1>
              <p className="text-gray-600 mt-2">Manage employee collections and payment tracking</p>
            </div>
            {(userRole === 'admin' || userRole === 'SUPER_ADMIN') && (
              <button
                onClick={handleAddCollection}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add New Collection
              </button>
            )}
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
              <option value="all">All Collections</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Collections Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection Details
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
                    Progress
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
                {filteredCollections.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No collections found
                    </td>
                  </tr>
                ) : (
                  filteredCollections.map((collection) => (
                    <tr key={collection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {formatDate(collection.startDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Due: {formatDate(collection.dueDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {collection.employeeName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {collection.employeeId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {getCollectionTypeLabel(collection.collectionType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Total: {formatCurrency(collection.totalAmount)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Remaining: {formatCurrency(collection.remainingAmount)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${getProgressPercentage(collection)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {collection.installmentsPaid}/{collection.totalInstallments} payments
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(collection.status)}>
                          {collection.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewCollection(collection)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {(userRole === 'admin' || userRole === 'SUPER_ADMIN') && (
                            <>
                              <button
                                onClick={() => handleEditCollection(collection)}
                                className="text-green-600 hover:text-green-900"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteCollection(collection.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                              {collection.status === 'ACTIVE' && (
                                <button
                                  onClick={() => handleRecordPayment(collection.id)}
                                  className="text-yellow-600 hover:text-yellow-900"
                                  title="Record Payment"
                                >
                                  <FaMoneyBill />
                                </button>
                              )}
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
          <CollectionFormModal
            collection={editingCollection}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setShowAddForm(false);
              setEditingCollection(null);
            }}
          />
        )}

        {/* View Modal */}
        {showViewModal && viewingCollection && (
          <CollectionViewModal
            collection={viewingCollection}
            onClose={() => {
              setShowViewModal(false);
              setViewingCollection(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Collection Form Modal Component
const CollectionFormModal = ({ collection, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    collectionType: collection?.collectionType || 'SALARY_ADVANCE',
    totalAmount: collection?.totalAmount || '',
    totalInstallments: collection?.totalInstallments || 1,
    startDate: collection?.startDate || new Date().toISOString().split('T')[0],
    dueDate: collection?.dueDate || new Date().toISOString().split('T')[0],
    description: collection?.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {collection ? 'Edit Collection' : 'Add New Collection'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection Type
            </label>
            <select
              value={formData.collectionType}
              onChange={(e) => setFormData({...formData, collectionType: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="SALARY_ADVANCE">Salary Advance</option>
              <option value="EQUIPMENT_DAMAGE">Equipment Damage</option>
              <option value="LOAN">Loan</option>
              <option value="MISCELLANEOUS">Miscellaneous</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount
            </label>
            <input
              type="number"
              value={formData.totalAmount}
              onChange={(e) => setFormData({...formData, totalAmount: parseFloat(e.target.value)})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total amount"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Installments
            </label>
            <input
              type="number"
              value={formData.totalInstallments}
              onChange={(e) => setFormData({...formData, totalInstallments: parseInt(e.target.value)})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of installments"
              min="1"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {collection ? 'Update' : 'Create'}
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

// Collection View Modal Component
const CollectionViewModal = ({ collection, onClose }) => {
  const getProgressPercentage = (collection) => {
    if (!collection.totalAmount || collection.totalAmount === 0) return 0;
    const paid = collection.totalAmount - collection.remainingAmount;
    return Math.round((paid / collection.totalAmount) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Collection Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee</label>
              <p className="text-sm text-gray-900">{collection.employeeName} ({collection.employeeId})</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Collection Type</label>
              <p className="text-sm text-gray-900">{collection.collectionType}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Amount</label>
              <p className="text-sm text-gray-900">{formatCurrency(collection.totalAmount)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remaining Amount</label>
              <p className="text-sm text-gray-900">{formatCurrency(collection.remainingAmount)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Installment Amount</label>
              <p className="text-sm text-gray-900">{formatCurrency(collection.installmentAmount)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Progress</label>
              <p className="text-sm text-gray-900">{collection.installmentsPaid}/{collection.totalInstallments} payments</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <p className="text-sm text-gray-900">{formatDate(collection.startDate)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <p className="text-sm text-gray-900">{formatDate(collection.dueDate)}</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="text-sm text-gray-900">{collection.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(collection.status)}`}>
              {collection.status?.toUpperCase()}
            </span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Progress</label>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div
                className="bg-blue-600 h-4 rounded-full flex items-center justify-center"
                style={{ width: `${getProgressPercentage(collection)}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {getProgressPercentage(collection)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsMain;
