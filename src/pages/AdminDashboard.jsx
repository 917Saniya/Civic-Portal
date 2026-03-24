import React, { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import PortalLayout from "../components/PortalLayout";
import StatusBadge from "../components/StatusBadge";
import { departmentStats, grievances as grievanceList, monthlyStats } from "../data/mockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [filters, setFilters] = useState({ id: "", department: "", status: "", date: "" });

  useEffect(() => {
    setGrievances(grievanceList);
  }, []);

  const filtered = grievances.filter((g) => {
    const idMatch = !filters.id || g.id.toLowerCase().includes(filters.id.toLowerCase());
    const depMatch = !filters.department || g.department === filters.department;
    const statusMatch = !filters.status || g.status === filters.status;
    const dateMatch = !filters.date || g.date === filters.date;
    return idMatch && depMatch && statusMatch && dateMatch;
  });

  const byDepartmentData = {
    labels: departmentStats.map((d) => d.department),
    datasets: [
      {
        label: "Complaints",
        data: departmentStats.map((d) => d.count),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const monthlyData = {
    labels: monthlyStats.map((d) => d.month),
    datasets: [
      {
        label: "Complaints",
        data: monthlyStats.map((d) => d.complaints),
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30,58,138,0.1)",
        tension: 0.3,
      },
      {
        label: "Resolved",
        data: monthlyStats.map((d) => d.resolved),
        borderColor: "#22C55E",
        backgroundColor: "rgba(34,197,94,0.1)",
        tension: 0.3,
      },
    ],
  };

  return (
    <PortalLayout title="Admin Dashboard">
      <section className="chart-grid">
        <div className="panel">
          <h3>Complaints by Department</h3>
          <Bar data={byDepartmentData} />
        </div>
        <div className="panel">
          <h3>Monthly Statistics</h3>
          <Line data={monthlyData} />
        </div>
      </section>

      <div className="panel filter-grid">
        <input
          placeholder="Complaint ID"
          value={filters.id}
          onChange={(e) => setFilters({ ...filters, id: e.target.value })}
        />
        <select
          value={filters.department}
          onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        >
          <option value="">All Departments</option>
          <option value="Water Department">Water Department</option>
          <option value="Electricity Board">Electricity Board</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Public Works">Public Works</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      <div className="panel table-wrap">
        <h3>All Complaints</h3>
        <table className="complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Department</th>
              <th>Status</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>{g.title}</td>
                <td>{g.department}</td>
                <td>
                  <StatusBadge status={g.status} />
                </td>
                <td>
                  <select defaultValue={g.department}>
                    <option>Water Department</option>
                    <option>Electricity Board</option>
                    <option>Sanitation</option>
                    <option>Public Works</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}

export default AdminDashboard;