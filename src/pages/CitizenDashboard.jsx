import React, { useEffect, useMemo, useState } from "react";
import { CircleCheckBig, CircleDashed, CircleEllipsis, FileWarning } from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import StatCard from "../components/StatCard";
import GrievanceCard from "../components/GrievanceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";
import { fetchMyGrievances } from "../api/grievanceApi";
import { getApiErrorMessage } from "../api/errorHandler";

function CitizenDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchMyGrievances();
        setGrievances(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load dashboard data."));
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
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

  const stats = useMemo(() => {
    const pending = normalized.filter((g) => g.status === "pending").length;
    const progress = normalized.filter((g) => g.status === "in_progress").length;
    const resolved = normalized.filter((g) => g.status === "resolved").length;
    return {
      total: normalized.length,
      pending,
      progress,
      resolved,
    };
  }, [normalized]);

  return (
    <PortalLayout title="Citizen Dashboard">
      {error && <Alert type="error" message={error} />}
      <section className="stats-grid">
        <StatCard title="Total Complaints" value={stats.total} icon={FileWarning} color="#1E3A8A" />
        <StatCard title="Pending" value={stats.pending} icon={CircleDashed} color="#EAB308" />
        <StatCard
          title="In Progress"
          value={stats.progress}
          icon={CircleEllipsis}
          color="#3B82F6"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={CircleCheckBig}
          color="#22C55E"
        />
      </section>
      <section>
        <h2 className="section-title">Recent Grievances</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grievance-grid">
            {normalized.slice(0, 6).map((g) => (
              <GrievanceCard key={g.id} grievance={g} />
            ))}
          </div>
        )}
      </section>
    </PortalLayout>
  );
}

export default CitizenDashboard;