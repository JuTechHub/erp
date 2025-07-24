import React, { useState } from "react";

// Mock employee and attendance data
const employees = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

// Generate mock attendance for current month
const getAttendanceData = () => {
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  return employees.map((emp) => ({
    ...emp,
    attendance: Array.from({ length: daysInMonth }, () => Math.random() > 0.2), // 80% present
  }));
};

const AttendanceLog = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  const attendanceData = getAttendanceData();

  const filteredData =
    selectedEmployee === "all"
      ? attendanceData
      : attendanceData.filter((emp) => emp.id === Number(selectedEmployee));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Log (Daily)</h2>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Employee:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="all">All Employees</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-center">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100">Employee</th>
              {[...Array(daysInMonth)].map((_, i) => {
                const date = new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  i + 1
                );
                const isSunday = date.getDay() === 0;
                return (
                  <th
                    key={i}
                    className={`border px-2 py-1 ${
                      isSunday ? "bg-yellow-200" : "bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((emp) => (
              <tr key={emp.id}>
                <td className="border px-2 py-1 font-semibold bg-gray-50">
                  {emp.name}
                </td>
                {emp.attendance.map((present, i) => {
                  const date = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    i + 1
                  );
                  const isSunday = date.getDay() === 0;
                  return (
                    <td
                      key={i}
                      className={`border px-2 py-1 ${
                        isSunday
                          ? "bg-yellow-100 text-gray-400 font-bold"
                          : present
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                    >
                      {isSunday ? "Sun" : present ? "✔" : "✗"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        ✔ = Present, ✗ = Absent,{" "}
        <span className="bg-yellow-100 px-1 rounded">Sun</span> = Sunday
      </div>
    </div>
  );
};

export default AttendanceLog;
