import React from "react";

// Mock data for payroll components
const payrolls = [
  { id: 1, name: "Basic Salary", field: "basic_salary", date: "2025-01-01", status: "Active", deductible: false },
  { id: 2, name: "House Rent Allowance", field: "hra", date: "2025-01-01", status: "Active", deductible: false },
  { id: 3, name: "Provident Fund", field: "pf", date: "2025-01-01", status: "Active", deductible: true },
  { id: 4, name: "Professional Tax", field: "pt", date: "2025-01-01", status: "Inactive", deductible: true },
];

export default function ViewPayrolls() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Payroll Components</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S No.</th>
              <th className="px-4 py-2 border">Name of Payment Component</th>
              <th className="px-4 py-2 border">Field Name</th>
              <th className="px-4 py-2 border">Date of Initialization</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Deductible</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p, idx) => (
              <tr key={p.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">{p.field}</td>
                <td className="px-4 py-2 border">{p.date}</td>
                <td className={`px-4 py-2 border font-semibold ${p.status === "Active" ? "text-green-600" : "text-red-600"}`}>{p.status}</td>
                <td className={`px-4 py-2 border font-semibold ${p.deductible ? "text-blue-600" : "text-gray-600"}`}>{p.deductible ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
