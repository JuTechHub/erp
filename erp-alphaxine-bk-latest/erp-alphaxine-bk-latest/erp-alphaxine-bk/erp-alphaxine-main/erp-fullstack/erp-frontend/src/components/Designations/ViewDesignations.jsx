import React, { useState } from "react";

const mockDesignations = [
  { id: 1, name: "Manager", date: "2025-06-01", status: "active" },
  { id: 2, name: "Software Engineer", date: "2025-05-15", status: "active" },
  { id: 3, name: "Accountant", date: "2025-04-10", status: "inactive" },
];

export default function ViewDesignations() {
  const [designations, setDesignations] = useState(mockDesignations);

  const handleEdit = (id) => {
    // Placeholder for edit functionality
    alert(`Edit designation with id: ${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Designations</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {designations.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No designations found.
                </td>
              </tr>
            ) : (
              designations.map((desig, idx) => (
                <tr key={desig.id}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{desig.name}</td>
                  <td className="px-6 py-4">{desig.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${desig.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{desig.status === 'active' ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(desig.id)}
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
