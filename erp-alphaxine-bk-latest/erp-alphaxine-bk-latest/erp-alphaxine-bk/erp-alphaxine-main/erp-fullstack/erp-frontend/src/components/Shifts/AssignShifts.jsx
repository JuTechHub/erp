import React, { useState } from "react";

// Mock data
const initialShifts = [
  { id: 1, name: "Day Shift", timing: "09:00 AM - 05:00 PM", employees: [] },
  { id: 2, name: "Afternoon Shift", timing: "01:00 PM - 09:00 PM", employees: [] },
  { id: 3, name: "Night Shift", timing: "09:00 PM - 05:00 AM", employees: [] },
];
const employeesList = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alex Kim" },
  { id: 4, name: "Priya Patel" },
];

export default function AssignShifts() {
  const [shifts, setShifts] = useState(initialShifts);
  const [draggedEmp, setDraggedEmp] = useState(null);

  // Table 1: Shifts with drop area
  const handleDrop = (shiftId) => {
    if (!draggedEmp) return;
    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === shiftId && !shift.employees.some((e) => e.id === draggedEmp.id)
          ? { ...shift, employees: [...shift.employees, draggedEmp] }
          : shift
      )
    );
    setDraggedEmp(null);
  };

  // Table 2: Employees
  const handleDragStart = (emp) => setDraggedEmp(emp);

  // Table 3: Employee-Shift assignments
  const assignments = [];
  shifts.forEach((shift) => {
    shift.employees.forEach((emp) => {
      assignments.push({ emp, shift });
    });
  });

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Table 1: Shifts with drop area */}
      <div>
        <h2 className="text-lg font-bold mb-4">Shifts</h2>
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Shift Name</th>
              <th className="px-4 py-2 border">Time Slot</th>
              <th className="px-4 py-2 border">Assign Employees</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td className="px-4 py-2 border font-semibold">{shift.name}</td>
                <td className="px-4 py-2 border">{shift.timing}</td>
                <td
                  className="px-4 py-2 border min-h-[60px] bg-gray-50"
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => handleDrop(shift.id)}
                >
                  {shift.employees.length === 0 && (
                    <span className="text-gray-400">Drag employee here</span>
                  )}
                  {shift.employees.map((emp) => (
                    <div key={emp.id} className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 m-1 text-xs">
                      {emp.name}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table 2: Employees */}
      <div>
        <h2 className="text-lg font-bold mb-4">Employees</h2>
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {employeesList.map((emp) => (
              <tr key={emp.id}>
                <td
                  className="px-4 py-2 border cursor-move bg-white hover:bg-blue-50"
                  draggable
                  onDragStart={() => handleDragStart(emp)}
                >
                  {emp.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table 3: Assignments */}
      <div>
        <h2 className="text-lg font-bold mb-4">Employee Shift Assignments</h2>
        <table className="min-w-full text-center border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Employee</th>
              <th className="px-4 py-2 border">Shift</th>
              <th className="px-4 py-2 border">Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-2 border text-gray-400">No assignments yet</td></tr>
            ) : (
              assignments.map((a, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">{a.emp.name}</td>
                  <td className="px-4 py-2 border">{a.shift.name}</td>
                  <td className="px-4 py-2 border">{a.shift.timing}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
