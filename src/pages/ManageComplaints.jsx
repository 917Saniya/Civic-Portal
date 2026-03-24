import React, { useMemo, useState } from "react";
import PortalLayout from "../components/PortalLayout";
import GrievanceCard from "../components/GrievanceCard";
import { grievances } from "../data/mockData";

function ManageComplaints() {
  const [filters, setFilters] = useState({
    id: "",
    department: "",
    status: "",
    date: "",
  });

  const filtered = useMemo(
    () =>
      grievances.filter((g) => {
        const idMatch = !filters.id || g.id.toLowerCase().includes(filters.id.toLowerCase());
        const depMatch = !filters.department || g.department === filters.department;
        const statusMatch = !filters.status || g.status === filters.status;
        const dateMatch = !filters.date || g.date === filters.date;
        return idMatch && depMatch && statusMatch && dateMatch;
      }),
    [filters]
  );

  return (
    <PortalLayout title="Manage My Complaints">
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
      <div className="grievance-grid">
        {filtered.map((g) => (
          <GrievanceCard key={g.id} grievance={g} />
        ))}
      </div>
    </PortalLayout>
  );
}

export default ManageComplaints;
