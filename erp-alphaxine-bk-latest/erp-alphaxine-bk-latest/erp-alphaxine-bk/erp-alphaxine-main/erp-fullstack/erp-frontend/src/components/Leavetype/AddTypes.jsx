import React, { useState } from "react";

export default function AddTypes() {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the new leave type to the backend
    setSuccess(true);
    setType("");
    setDate("");
    setActive(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add Leave Type</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of Leave</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Sick Leave"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Addition</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)}
            id="active"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="active" className="text-sm text-gray-700">Active</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Leave Type
        </button>
        {success && <div className="text-green-600 font-medium">Leave type added successfully!</div>}
      </form>
    </div>
  );
}
