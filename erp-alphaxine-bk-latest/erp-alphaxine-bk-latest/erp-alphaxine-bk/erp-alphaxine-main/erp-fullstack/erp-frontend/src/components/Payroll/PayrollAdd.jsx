import React, { useState } from "react";

// Mock payroll components
const payrollComponents = [
  { id: 1, name: "Basic Salary" },
  { id: 2, name: "House Rent Allowance" },
  { id: 3, name: "Provident Fund" },
  { id: 4, name: "Professional Tax" },
];
// Mock employees
const employees = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alex Kim" },
];

export default function AddPayrolls() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [deductible, setDeductible] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [fiscal, setFiscal] = useState("");
  const [amounts, setAmounts] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAmountChange = (id, value) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const total = Object.values(amounts).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0
  );
  const empName =
    employees.find((e) => e.id === parseInt(selectedEmp))?.name || "";

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Assign Payroll Components
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div>
          <label className="block mb-2 font-medium">Select Employee</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedEmp}
            onChange={(e) => setSelectedEmp(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Fiscal Year</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={fiscal}
            onChange={(e) => setFiscal(e.target.value)}
            required
            placeholder="e.g. 2025-2026"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Payroll Components</label>
          <table className="min-w-full text-center border mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Component</th>
                <th className="px-4 py-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payrollComponents.map((comp) => (
                <tr key={comp.id}>
                  <td className="px-4 py-2 border">{comp.name}</td>
                  <td className="px-4 py-2 border">
                    <input
                      type="number"
                      className="w-32 border rounded px-2 py-1"
                      value={amounts[comp.id] || ""}
                      onChange={(e) =>
                        handleAmountChange(comp.id, e.target.value)
                      }
                      min="0"
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Assign Payroll
        </button>
      </form>
      {showConfirm && (
        <div className="mt-8 bg-gray-100 rounded-lg p-6 shadow">
          <h2 className="text-lg font-bold mb-4">
            Confirm Payroll Assignment
          </h2>
          <p className="mb-2">
            Are you sure you want to assign a total of{" "}
            <span className="font-semibold">
              ${total.toLocaleString()}
            </span>{" "}
            to{" "}
            <span className="font-semibold">{empName}</span> for fiscal year{" "}
            <span className="font-semibold">{fiscal}</span>?
          </p>
          <ul className="mb-4">
            {payrollComponents.map((comp) => (
              <li key={comp.id}>
                {comp.name}:{" "}
                <span className="font-semibold">{amounts[comp.id] || 0}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => setShowConfirm(false)}
            >
              Confirm
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
