import React, { useState } from "react";

const mockDepartments = [
  { id: 1, code: "HR", name: "Human Resources", date: "2025-06-01", status: "active" },
  { id: 2, code: "ENG", name: "Engineering", date: "2025-05-15", status: "active" },
  { id: 3, code: "FIN", name: "Finance", date: "2025-04-10", status: "inactive" },
];

export default function ViewDepartments() {
  const [departments, setDepartments] = useState(mockDepartments);

  const handleEdit = (id) => {
    // Placeholder for edit functionality
    alert(`Edit department with id: ${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Departments</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            ) : (
              departments.map((dept, idx) => (
                <tr key={dept.id}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{dept.code}</td>
                  <td className="px-6 py-4">{dept.name}</td>
                  <td className="px-6 py-4">{dept.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${dept.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{dept.status === 'active' ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(dept.id)}
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
