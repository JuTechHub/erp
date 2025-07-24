import React, { useState } from "react";

const mockRequests = [
  {
    id: 1,
    employee: "John Doe",
    empId: "EMP001",
    leaveType: "Sick Leave",
    from: "2025-07-01",
    to: "2025-07-03",
    status: "pending",
    reason: "Fever and cold"
  },
  {
    id: 2,
    employee: "Jane Smith",
    empId: "EMP002",
    leaveType: "Casual Leave",
    from: "2025-07-05",
    to: "2025-07-06",
    status: "pending",
    reason: "Family function"
  }
];

export default function LeaveRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [actionReason, setActionReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: action, actionReason: action === "rejected" ? actionReason : "" }
          : req
      )
    );
    setSelectedId(null);
    setActionReason("");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Leave Requests</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S No.</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              requests.map((req, idx) => (
                <tr key={req.id}>
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{req.employee}</td>
                  <td className="px-4 py-3">{req.empId}</td>
                  <td className="px-4 py-3">{req.leaveType}</td>
                  <td className="px-4 py-3">{req.from}</td>
                  <td className="px-4 py-3">{req.to}</td>
                  <td className="px-4 py-3">{req.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : req.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                    {req.status === 'rejected' && req.actionReason && (
                      <div className="text-xs text-red-500 mt-1">Reason: {req.actionReason}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {req.status === 'pending' ? (
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleAction(req.id, "accepted")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => setSelectedId(req.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Reject
                        </button>
                        {selectedId === req.id && (
                          <div className="mt-2">
                            <input
                              type="text"
                              value={actionReason}
                              onChange={e => setActionReason(e.target.value)}
                              placeholder="Reason for rejection"
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs mb-1"
                            />
                            <button
                              onClick={() => handleAction(req.id, "rejected")}
                              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs w-full"
                            >
                              Confirm Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No action</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
