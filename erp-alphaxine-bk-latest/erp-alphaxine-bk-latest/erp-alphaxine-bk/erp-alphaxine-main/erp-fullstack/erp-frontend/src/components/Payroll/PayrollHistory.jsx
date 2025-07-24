import React from "react";

// Mock data for payroll history
const payrollHistory = [
  { id: 1, empId: "EMP001", name: "John Doe", monthly: 5000, yearly: 60000, status: "Active", fiscal: "2024-2025" },
  { id: 2, empId: "EMP002", name: "Jane Smith", monthly: 4500, yearly: 54000, status: "Active", fiscal: "2024-2025" },
  { id: 3, empId: "EMP003", name: "Alex Kim", monthly: 4000, yearly: 48000, status: "Inactive", fiscal: "2023-2024" },
  { id: 4, empId: "EMP004", name: "Priya Patel", monthly: 5200, yearly: 62400, status: "Active", fiscal: "2024-2025" },
];

export default function PayrollHistory() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Payroll History</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S No.</th>
              <th className="px-4 py-2 border">Employee Name</th>
              <th className="px-4 py-2 border">Employee ID</th>
              <th className="px-4 py-2 border">Monthly Salary</th>
              <th className="px-4 py-2 border">Yearly Salary</th>
              <th className="px-4 py-2 border">Fiscal Year</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollHistory.map((p, idx) => (
              <tr key={p.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">{p.empId}</td>
                <td className="px-4 py-2 border">${p.monthly.toLocaleString()}</td>
                <td className="px-4 py-2 border">${p.yearly.toLocaleString()}</td>
                <td className="px-4 py-2 border">{p.fiscal}</td>
                <td className={`px-4 py-2 border font-semibold ${p.status === "Active" ? "text-green-600" : "text-red-600"}`}>{p.status}</td>
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
