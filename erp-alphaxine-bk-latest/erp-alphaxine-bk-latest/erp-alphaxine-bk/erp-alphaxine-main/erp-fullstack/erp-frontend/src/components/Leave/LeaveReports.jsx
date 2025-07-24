import React from "react";

// Mock data for leave history
const leaveHistory = [
  { id: 1, name: "John Doe", type: "Sick Leave", from: "2025-06-10", to: "2025-06-12", status: "Approved" },
  { id: 2, name: "Jane Smith", type: "Casual Leave", from: "2025-06-15", to: "2025-06-16", status: "Rejected" },
  { id: 3, name: "Alex Kim", type: "Annual Leave", from: "2025-06-20", to: "2025-06-22", status: "Approved" },
  { id: 4, name: "Priya Patel", type: "Sick Leave", from: "2025-06-25", to: "2025-06-26", status: "Pending" },
];

// Mock data for upcoming leaves
const upcomingLeaves = [
  { id: 1, name: "John Doe", date: "2025-07-03", type: "Sick Leave" },
  { id: 2, name: "Jane Smith", date: "2025-07-10", type: "Casual Leave" },
  { id: 3, name: "Alex Kim", date: "2025-07-15", type: "Annual Leave" },
];

export default function LeaveReports() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Leave Reports</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Leave History</h2>
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Employee</th>
              <th className="px-4 py-2 border">Leave Type</th>
              <th className="px-4 py-2 border">From</th>
              <th className="px-4 py-2 border">To</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave) => (
              <tr key={leave.id}>
                <td className="px-4 py-2 border">{leave.name}</td>
                <td className="px-4 py-2 border">{leave.type}</td>
                <td className="px-4 py-2 border">{leave.from}</td>
                <td className="px-4 py-2 border">{leave.to}</td>
                <td className={`px-4 py-2 border font-semibold ${leave.status === "Approved" ? "text-green-600" : leave.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Upcoming Leaves</h2>
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Employee</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Leave Type</th>
            </tr>
          </thead>
          <tbody>
            {upcomingLeaves.map((leave) => (
              <tr key={leave.id}>
                <td className="px-4 py-2 border">{leave.name}</td>
                <td className="px-4 py-2 border">{leave.date}</td>
                <td className="px-4 py-2 border">{leave.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
