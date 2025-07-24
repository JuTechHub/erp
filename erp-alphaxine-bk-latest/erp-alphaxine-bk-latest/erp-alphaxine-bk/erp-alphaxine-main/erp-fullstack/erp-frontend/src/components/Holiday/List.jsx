import React from "react";

// Mock data for holidays
const companyHolidays = [
  { id: 1, name: "Company Foundation Day", date: "2025-07-10", day: "Thursday", status: "Active" },
  { id: 2, name: "Annual Retreat", date: "2025-09-15", day: "Monday", status: "Active" },
];
const nationalHolidays = [
  { id: 1, name: "Independence Day", date: "2025-08-15", day: "Friday", status: "Active" },
  { id: 2, name: "Republic Day", date: "2025-01-26", day: "Sunday", status: "Active" },
];
const stateHolidays = [
  { id: 1, name: "Statehood Day", date: "2025-11-01", day: "Saturday", status: "Inactive" },
];
const internationalHolidays = [
  { id: 1, name: "New Year's Day", date: "2025-01-01", day: "Wednesday", status: "Active" },
  { id: 2, name: "Labour Day", date: "2025-05-01", day: "Thursday", status: "Active" },
];

function HolidayTable({ title, holidays }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <table className="min-w-full text-center border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">SN</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Day</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((h, idx) => (
            <tr key={h.id}>
              <td className="px-4 py-2 border">{idx + 1}</td>
              <td className="px-4 py-2 border">{h.name}</td>
              <td className="px-4 py-2 border">{h.date}</td>
              <td className="px-4 py-2 border">{h.day}</td>
              <td className={`px-4 py-2 border font-semibold ${h.status === "Active" ? "text-green-600" : "text-red-600"}`}>{h.status}</td>
              <td className="px-4 py-2 border">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HolidayList() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Holiday List</h1>
      <HolidayTable title="Company Holidays" holidays={companyHolidays} />
      <HolidayTable title="National Holidays" holidays={nationalHolidays} />
      <HolidayTable title="State Holidays" holidays={stateHolidays} />
      <HolidayTable title="International Holidays" holidays={internationalHolidays} />
    </div>
  );
}
