import React from "react";

// Mock data for shifts
const shifts = [
  { id: 1, name: "Day Shift", timing: "Day (09:00 AM - 05:00 PM)", status: "Active" },
  { id: 2, name: "Afternoon Shift", timing: "Afternoon (01:00 PM - 09:00 PM)", status: "Active" },
  { id: 3, name: "Night Shift", timing: "Night (09:00 PM - 05:00 AM)", status: "Inactive" },
  { id: 4, name: "Weekend Shift", timing: "Day (10:00 AM - 06:00 PM)", status: "Active" },
];

export default function ViewShifts() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Shifts</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S No.</th>
              <th className="px-4 py-2 border">Name of Shift</th>
              <th className="px-4 py-2 border">Time of Shift</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift, idx) => (
              <tr key={shift.id}>
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{shift.name}</td>
                <td className="px-4 py-2 border">{shift.timing}</td>
                <td className={`px-4 py-2 border font-semibold ${shift.status === "Active" ? "text-green-600" : "text-red-600"}`}>{shift.status}</td>
                <td className="px-4 py-2 border">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
