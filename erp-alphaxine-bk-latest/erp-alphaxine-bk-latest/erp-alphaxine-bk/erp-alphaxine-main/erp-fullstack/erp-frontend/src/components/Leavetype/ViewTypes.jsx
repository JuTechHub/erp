import React, { useState } from "react";

const mockLeaveTypes = [
  { id: 1, type: "Sick Leave", date: "2025-06-01", active: true },
  { id: 2, type: "Casual Leave", date: "2025-05-15", active: true },
  { id: 3, type: "Maternity Leave", date: "2025-04-10", active: false },
];

export default function ViewTypes() {
  const [leaveTypes, setLeaveTypes] = useState(mockLeaveTypes);

  const handleEdit = (id) => {
    // Placeholder for edit functionality
    alert(`Edit leave type with id: ${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Leave Types</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Leave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveTypes.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No leave types found.
                </td>
              </tr>
            ) : (
              leaveTypes.map((lt, idx) => (
                <tr key={lt.id}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{lt.type}</td>
                  <td className="px-6 py-4">{lt.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${lt.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{lt.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(lt.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
