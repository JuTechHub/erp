import React from "react";

// Mock data for payrolls
const payrolls = [
  { id: 1, empId: "EMP001", name: "John Doe", month: "June 2025", total: 5000 },
  { id: 2, empId: "EMP002", name: "Jane Smith", month: "June 2025", total: 4500 },
  { id: 3, empId: "EMP003", name: "Alex Kim", month: "June 2025", total: 4000 },
];

export default function PayrollGenerate() {
  const handleDownload = (empId) => {
    // In real app, trigger backend PDF generation/download
    alert(`Download payroll PDF for ${empId}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Generate Payroll</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S No.</th>
              <th className="px-4 py-2 border">Employee Name</th>
              <th className="px-4 py-2 border">Employee ID</th>
              <th className="px-4 py-2 border">Month</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p, idx) => (
              <tr key={p.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">{p.empId}</td>
                <td className="px-4 py-2 border">{p.month}</td>
                <td className="px-4 py-2 border">${p.total.toLocaleString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleDownload(p.empId)}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
