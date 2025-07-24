import React, { useState } from "react";

const leaveTypes = [
  { id: 1, name: "Sick Leave" },
  { id: 2, name: "Casual Leave" },
  { id: 3, name: "Earned Leave" },
];

// Mock leave requests for approval
const mockRequests = [
  {
    id: 1,
    name: "John Doe",
    type: "Sick Leave",
    from: "2025-07-01",
    to: "2025-07-03",
    reason: "Fever and cold",
    status: "Pending"
  },
  {
    id: 2,
    name: "Jane Smith",
    type: "Casual Leave",
    from: "2025-07-05",
    to: "2025-07-05",
    reason: "Personal work",
    status: "Pending"
  }
];

export default function ApplyForLeave() {
  const [form, setForm] = useState({
    type: "",
    from: "",
    to: "",
    reason: ""
  });
  const [requests, setRequests] = useState(mockRequests);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.type || !form.from || !form.to || !form.reason) return;
    setRequests([
      ...requests,
      {
        id: Date.now(),
        name: "Current Admin", // Replace with actual admin name
        type: leaveTypes.find((t) => t.id === parseInt(form.type))?.name || "",
        from: form.from,
        to: form.to,
        reason: form.reason,
        status: "Pending"
      }
    ]);
    setForm({ type: "", from: "", to: "", reason: "" });
  };

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
    );
  };
  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Apply for Leave</h1>
      <form className="max-w-lg mb-10 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Leave Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">From</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              name="from"
              value={form.from}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">To</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              name="to"
              value={form.to}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Reason</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
        >
          Apply
        </button>
      </form>
    </div>
  );
}
