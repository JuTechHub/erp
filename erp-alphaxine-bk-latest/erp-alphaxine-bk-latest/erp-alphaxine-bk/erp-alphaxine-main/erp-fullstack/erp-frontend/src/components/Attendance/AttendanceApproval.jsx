import React, { useState } from "react";

// Mock data for pending attendance approvals
const mockApprovals = [
  {
    id: 1,
    name: "John Doe",
    date: "2025-06-30",
    day: "Monday",
    status: "Pending",
    requestedTime: "09:30 - 17:00",
    reason: "Forgot to check in on time"
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2025-06-29",
    day: "Sunday",
    status: "Pending",
    requestedTime: "09:00 - 16:45",
    reason: "Worked on weekend, needs approval"
  }
];

export default function AttendanceApproval() {
  const [approvals, setApprovals] = useState(mockApprovals);

  const handleApprove = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    // Here you would call backend API to approve
  };
  const handleReject = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    // Here you would call backend API to reject
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Attendance Approval</h1>
      {approvals.length === 0 ? (
        <div className="text-green-600 font-semibold">No pending attendance approvals.</div>
      ) : (
        <table className="min-w-full text-center border mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Employee</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Day</th>
              <th className="px-4 py-2 border">Requested Time</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-2 border font-semibold">{a.name}</td>
                <td className="px-4 py-2 border">{a.date}</td>
                <td className="px-4 py-2 border">{a.day}</td>
                <td className="px-4 py-2 border">{a.requestedTime}</td>
                <td className="px-4 py-2 border">{a.reason}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleApprove(a.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(a.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
