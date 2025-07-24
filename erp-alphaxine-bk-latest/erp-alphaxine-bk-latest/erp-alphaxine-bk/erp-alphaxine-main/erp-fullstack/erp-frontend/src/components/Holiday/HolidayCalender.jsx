import React, { useState } from "react";

// Mock data for holidays
const holidays = [
  { date: "2025-07-10", label: "Company Foundation Day", type: "company" },
  { date: "2025-09-15", label: "Annual Retreat", type: "company" },
  { date: "2025-08-15", label: "Independence Day", type: "national" },
  { date: "2025-01-26", label: "Republic Day", type: "national" },
  { date: "2025-11-01", label: "Statehood Day", type: "state" },
  { date: "2025-01-01", label: "New Year's Day", type: "international" },
  { date: "2025-05-01", label: "Labour Day", type: "international" },
];

const typeColors = {
  company: "bg-blue-200 text-blue-900",
  national: "bg-green-200 text-green-900",
  state: "bg-yellow-200 text-yellow-900",
  international: "bg-red-200 text-red-900",
};

function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getHoliday(dateStr) {
  return holidays.find((h) => h.date === dateStr);
}

const today = new Date();

export default function HolidayCalender() {
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const days = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const weeks = [];
  let week = Array(firstDay).fill(null);
  days.forEach((date) => {
    week.push(date);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-2 py-1 bg-gray-200 rounded">Prev</button>
        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>
        <button onClick={nextMonth} className="px-2 py-1 bg-gray-200 rounded">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-1 bg-gray-100 rounded-t">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-semibold py-2">{d}</div>
        ))}
      </div>
      {weeks.map((week, i) => (
        <div key={i} className="grid grid-cols-7 gap-1">
          {week.map((date, j) => {
            if (!date) return <div key={j} className="h-20 bg-white" />;
            const dateStr = date.toISOString().slice(0, 10);
            const holiday = getHoliday(dateStr);
            let bg = "bg-white";
            let label = null;
            if (holiday) {
              bg = typeColors[holiday.type] || "bg-gray-200";
              label = holiday.label;
            }
            return (
              <div key={j} className={`h-20 p-1 border rounded flex flex-col ${bg}`}>
                <div className="font-bold text-sm">{date.getDate()}</div>
                {label && <div className="text-xs mt-1">{label}</div>}
              </div>
            );
          })}
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-200 inline-block rounded" /> Company Holiday</div>
        <div className="flex items-center gap-1"><span className="w-4 h-4 bg-green-200 inline-block rounded" /> National Holiday</div>
        <div className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-200 inline-block rounded" /> State Holiday</div>
        <div className="flex items-center gap-1"><span className="w-4 h-4 bg-red-200 inline-block rounded" /> International Holiday</div>
      </div>
    </div>
  );
}
