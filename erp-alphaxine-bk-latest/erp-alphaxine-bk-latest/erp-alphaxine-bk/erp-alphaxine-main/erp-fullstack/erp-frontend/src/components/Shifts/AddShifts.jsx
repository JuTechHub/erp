import React, { useState } from "react";

export default function AddShifts() {
  const [name, setName] = useState("");
  const [timing, setTiming] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send data to backend or update state
    alert(`Shift Added: ${name} | ${timing} | ${status}`);
    setName("");
    setTiming("");
    setStatus("Active");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add New Shift</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block mb-2 font-medium">Name of Shift</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Day Shift"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Time of Shift</label>
          <select
            className="w-full border rounded px-3 py-2 mb-2"
            value={timing}
            onChange={e => setTiming(e.target.value)}
            required
          >
            <option value="">Select Timing</option>
            <option value="Day (09:00 AM - 05:00 PM)">Day (09:00 AM - 05:00 PM)</option>
            <option value="Afternoon (01:00 PM - 09:00 PM)">Afternoon (01:00 PM - 09:00 PM)</option>
            <option value="Night (09:00 PM - 05:00 AM)">Night (09:00 PM - 05:00 AM)</option>
            <option value="Weekend (10:00 AM - 06:00 PM)">Weekend (10:00 AM - 06:00 PM)</option>
          </select>
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Add Shift
        </button>
      </form>
    </div>
  );
}
