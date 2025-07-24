import React, { useState } from "react";

// Mock attendance hours data
const attendanceData = [
  {
    id: 1,
    name: "John Doe",
    daily: [8, 7.5, 8.5, 8, 6, 9, 8], // 7 days
    weekly: [55, 40, 42, 38], // 4 weeks
    monthly: [8, 7.5, 8.5, 8, 6, 9, 8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  },
  {
    id: 2,
    name: "Jane Smith",
    daily: [8, 8, 8, 7, 8, 8, 8],
    weekly: [40, 39, 41, 40],
    monthly: [8, 8, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function LineGraph({ data, labels, color }) {
  // SVG line graph for 30 days, scrollable
  const width = Math.max(900, 30 * 30); // 30px per day, min 900px
  const height = 300;
  const padding = 40;
  const maxY = Math.max(...data, 8);
  const minY = Math.min(...data, 0);
  const points = data.map((y, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const yVal = height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
    return `${x},${yVal}`;
  });
  return (
    <div className="overflow-x-auto">
      <svg width={width} height={height} className="bg-white rounded border min-w-full">
        {/* X and Y axis */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#888" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#888" />
        {/* 8hr reference line */}
        <line x1={padding} y1={height - padding - ((8 - minY) / (maxY - minY)) * (height - 2 * padding)} x2={width - padding} y2={height - padding - ((8 - minY) / (maxY - minY)) * (height - 2 * padding)} stroke="#22c55e" strokeDasharray="4" />
        {/* Data line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points.join(" ")}
        />
        {/* Data points */}
        {data.map((y, i) => {
          const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
          const yVal = height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
          return <circle key={i} cx={x} cy={yVal} r={3} fill={color} />;
        })}
        {/* X labels (show every 2nd day for clarity) */}
        {labels.map((label, i) => {
          const x = padding + (i * (width - 2 * padding)) / (labels.length - 1);
          return i % 2 === 0 ? <text key={i} x={x} y={height - 15} fontSize="10" textAnchor="middle">{label}</text> : null;
        })}
        {/* Y labels */}
        {[minY, 8, maxY].map((y, i) => {
          const yVal = height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
          return <text key={i} x={10} y={yVal + 4} fontSize="10">{y}</text>;
        })}
      </svg>
    </div>
  );
}

export default function ReportAndGraphs() {
  const [selectedEmp, setSelectedEmp] = useState(attendanceData[0].id);
  const emp = attendanceData.find(e => e.id === parseInt(selectedEmp));

  // For 30-day graph
  const monthLabels = Array.from({ length: emp.monthly.length }, (_, i) => `${i + 1}`);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Attendance Reports & Graphs</h1>
      <div className="mb-6 max-w-xs">
        <label className="block mb-2 font-medium">Select Employee</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedEmp}
          onChange={e => setSelectedEmp(e.target.value)}
        >
          {attendanceData.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </div>
      {/* Monthly Attendance Line Graph (30 days) */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Monthly Attendance (Last 30 Days)</h2>
        <LineGraph data={emp.monthly} labels={monthLabels} color="#3b82f6" />
        <div className="text-xs mt-2">Green dashed line: 8 hrs reference</div>
      </div>
      {/* Weekly Attendance Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Weekly Attendance (Last 4 Weeks)</h2>
        <table className="min-w-full text-center border mb-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Week</th>
              <th className="px-4 py-2 border">Total Hours</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {emp.weekly.map((hrs, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 border">Week {idx + 1}</td>
                <td className="px-4 py-2 border">{hrs}</td>
                <td className={`px-4 py-2 border font-semibold ${hrs >= 40 ? "text-green-600" : "text-red-600"}`}>{hrs >= 40 ? "Above 8 hrs/day" : "Below 8 hrs/day"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
