import React from "react";

// Mock data for demonstration
const leaves = [
  { date: "2025-07-03", type: "company", label: "Company Leave" },
  { date: "2025-07-10", type: "employee", label: "John Doe" },
  { date: "2025-07-15", type: "employee", label: "Jane Smith" },
  { date: "2025-07-20", type: "holiday", label: "Independence Day" },
  { date: "2025-07-25", type: "holiday", label: "International Workers' Day" },
];

function getDayColor(dateStr) {
  const leave = leaves.find(l => l.date === dateStr);
  if (!leave) return null;
  if (leave.type === "company") return "bg-blue-200 text-blue-900";
  if (leave.type === "employee") return "bg-green-200 text-green-900";
  if (leave.type === "holiday") return "bg-red-200 text-red-900";
  return null;
}

function getDayLabel(dateStr) {
  const leave = leaves.find(l => l.date === dateStr);
  return leave ? leave.label : null;
}

export default function LeaveCalender() {
  // For demo, show July 2025
  const year = 2025;
  const month = 6; // July (0-indexed)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weeks = [];
  let day = 1 - firstDay;
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      if (day > 0 && day <= daysInMonth) {
        const dateStr = `${year}-07-${day.toString().padStart(2, "0")}`;
        week.push({
          day,
          color: getDayColor(dateStr),
          label: getDayLabel(dateStr),
        });
      } else {
        week.push(null);
      }
      day++;
    }
    weeks.push(week);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Leave Calendar (July 2025)</h1>
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <table className="min-w-full text-center">
          <thead>
            <tr>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <th key={d} className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((cell, j) => (
                  <td key={j} className={`h-20 w-24 align-top ${cell?.color || ''}`}>
                    {cell && (
                      <div>
                        <div className="font-bold">{cell.day}</div>
                        {cell.label && <div className="text-xs mt-1">{cell.label}</div>}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex space-x-6">
          <div className="flex items-center"><span className="w-4 h-4 bg-blue-200 inline-block mr-2 rounded"></span>Company Leave</div>
          <div className="flex items-center"><span className="w-4 h-4 bg-green-200 inline-block mr-2 rounded"></span>Employee Leave</div>
          <div className="flex items-center"><span className="w-4 h-4 bg-red-200 inline-block mr-2 rounded"></span>Holiday</div>
        </div>
      </div>
    </div>
  );
}
