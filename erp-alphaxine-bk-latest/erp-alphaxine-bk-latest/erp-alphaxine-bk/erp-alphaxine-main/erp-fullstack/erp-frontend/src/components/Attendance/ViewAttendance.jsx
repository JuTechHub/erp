import React, { useState } from "react";

// Mock data for attendance
const attendanceData = [
  {
    id: 1,
    name: "John Doe",
    records: [
      { date: "2025-06-28", day: "Saturday", status: "Present", time: "09:00 - 17:00" },
      { date: "2025-06-29", day: "Sunday", status: "Absent", time: "-" },
      { date: "2025-06-30", day: "Monday", status: "Present", time: "09:15 - 17:05" },
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    records: [
      { date: "2025-06-28", day: "Saturday", status: "Present", time: "09:10 - 17:00" },
      { date: "2025-06-29", day: "Sunday", status: "Present", time: "09:00 - 16:50" },
      { date: "2025-06-30", day: "Monday", status: "Absent", time: "-" },
    ]
  },
];

export default function ViewAttendance() {
  const [selectedEmp, setSelectedEmp] = useState("");
  const employees = attendanceData.map(e => ({ id: e.id, name: e.name }));
  const filtered = selectedEmp
    ? attendanceData.filter(e => e.id === parseInt(selectedEmp))
    : attendanceData;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Employee Attendance</h1>
      <div className="mb-6 max-w-xs">
        <label className="block mb-2 font-medium">Select Employee</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedEmp}
          onChange={e => setSelectedEmp(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>
      {filtered.map((emp) => (
        <div key={emp.id} className="mb-8">
          <h2 className="text-lg font-bold mb-2">{emp.name}</h2>
          <table className="min-w-full text-center border mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Day</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Time (In - Out)</th>
              </tr>
            </thead>
            <tbody>
              {emp.records.map((rec, idx) => {
                const isSunday = rec.day === "Sunday";
                // Placeholder: treat 2025-06-29 as a holiday for demo
                const isHoliday = rec.date === "2025-06-29";
                return (
                  <tr key={idx} className={isSunday ? "bg-yellow-100" : isHoliday ? "bg-blue-100" : ""}>
                    <td className="px-4 py-2 border">{rec.date}</td>
                    <td className="px-4 py-2 border font-bold">{rec.day}{isSunday && " (Sun)"}{isHoliday && " (Holiday)"}</td>
                    <td className={`px-4 py-2 border font-semibold ${rec.status === "Present" ? "text-green-600" : "text-red-600"}`}>{rec.status}</td>
                    <td className="px-4 py-2 border">{rec.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
