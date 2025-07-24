import React, { useState } from "react";

export default function AddPayrolls() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [deductible, setDeductible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send data to backend or update state
    alert(`Payroll Component Added: ${name} | ${field} | ${date} | ${status} | Deductible: ${deductible ? "Yes" : "No"}`);
    setName("");
    setField("");
    setDate("");
    setStatus("Active");
    setDeductible(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add Payroll Component</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block mb-2 font-medium">Name of Payment Component</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Basic Salary"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Field Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={field}
            onChange={e => setField(e.target.value)}
            required
            placeholder="e.g. basic_salary"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Date of Initialization</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="deductible"
            checked={deductible}
            onChange={e => setDeductible(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="deductible" className="font-medium">Deductible</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Add Component
        </button>
      </form>
    </div>
  );
}
