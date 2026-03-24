import React, { useEffect, useMemo, useState } from "react";
import PortalLayout from "../components/PortalLayout";
import GrievanceCard from "../components/GrievanceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";
import { fetchMyGrievances } from "../api/grievanceApi";
import { getApiErrorMessage } from "../api/errorHandler";

function ManageComplaints() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    department: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyGrievances();
        setGrievances(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load complaint list."));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const normalized = useMemo(
    () =>
      grievances.map((item, idx) => ({
        id: item.id || item.complaintId || item.grievanceId || `GRV-${1000 + idx}`,
        title: item.title || "Untitled Grievance",
        department: item.department || item.category || "Unassigned Department",
        description: item.description || "No description provided.",
        date: item.date || item.createdAt?.slice(0, 10) || "N/A",
        status: String(item.status || "pending").toLowerCase().replace(/\s+/g, "_"),
      })),
    [grievances]
  );

  const filtered = useMemo(
    () =>
      normalized.filter((g) => {
        const idMatch =
          !filters.id || g.id.toString().toLowerCase().includes(filters.id.toLowerCase());
        const depMatch = !filters.department || g.department === filters.department;
        const statusMatch = !filters.status || g.status === filters.status;
        const dateMatch = !filters.date || g.date === filters.date;
        return idMatch && depMatch && statusMatch && dateMatch;
      }),
    [filters, normalized]
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
      {error && <Alert type="error" message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grievance-grid">
          {filtered.map((g) => (
            <GrievanceCard key={g.id} grievance={g} />
          ))}
        </div>
      )}
    </PortalLayout>
  );
}

export default ManageComplaints;
