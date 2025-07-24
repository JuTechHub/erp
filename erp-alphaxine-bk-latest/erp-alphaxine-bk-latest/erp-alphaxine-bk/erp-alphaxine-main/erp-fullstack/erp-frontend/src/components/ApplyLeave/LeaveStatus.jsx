import React, { useState } from "react";

// Mock leave status data for the current user
const mockLeaveStatus = [
  {
    id: 1,
    type: "Sick Leave",
    from: "2025-07-01",
    to: "2025-07-03",
    reason: "Fever and cold",
    status: "Approved",
    actionDate: "2025-06-30"
  },
  {
    id: 2,
    type: "Casual Leave",
    from: "2025-07-05",
    to: "2025-07-05",
    reason: "Personal work",
    status: "Rejected",
    actionDate: "2025-06-29"
  },
  {
    id: 3,
    type: "Earned Leave",
    from: "2025-07-10",
    to: "2025-07-12",
    reason: "Family function",
    status: "Pending",
    actionDate: "2025-06-30"
  }
];

export default function LeaveStatus() {
  const [leaveList, setLeaveList] = useState(mockLeaveStatus);
  const [reapplyId, setReapplyId] = useState(null);
  const [form, setForm] = useState({ type: "", from: "", to: "", reason: "" });

  const handleReapply = (leave) => {
    setReapplyId(leave.id);
    setForm({ type: leave.type, from: leave.from, to: leave.to, reason: leave.reason });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeaveList([
      ...leaveList,
      {
        id: Date.now(),
        ...form,
        status: "Pending",
        actionDate: new Date().toISOString().slice(0, 10)
      }
    ]);
    setReapplyId(null);
    setForm({ type: "", from: "", to: "", reason: "" });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">My Leave Applications</h1>
      <table className="min-w-full text-center border mb-8">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">From</th>
            <th className="px-4 py-2 border">To</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action Date</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveList.map((leave) => (
            <tr key={leave.id}>
              <td className="px-4 py-2 border">{leave.type}</td>
              <td className="px-4 py-2 border">{leave.from}</td>
              <td className="px-4 py-2 border">{leave.to}</td>
              <td className="px-4 py-2 border">{leave.reason}</td>
              <td className={`px-4 py-2 border font-bold ${leave.status === "Approved" ? "text-green-600" : leave.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{leave.status}</td>
              <td className="px-4 py-2 border">{leave.actionDate}</td>
              <td className="px-4 py-2 border">
                {leave.status === "Rejected" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleReapply(leave)}
                  >
                    Re-Apply
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reapplyId && (
        <form className="max-w-lg mb-10 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Re-Apply for Leave</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Leave Type</label>
            <input
              className="w-full border rounded px-3 py-2"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              readOnly
            />
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
            Submit Re-Application
          </button>
        </form>
      )}
    </div>
  );
}
