import React, { useEffect, useState } from "react";
import PortalLayout from "../components/PortalLayout";
import GrievanceCard from "../components/GrievanceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "../components/Alert";
import { fetchMyGrievances } from "../api/grievanceApi";
import { getApiErrorMessage } from "../api/errorHandler";

function TrackGrievance() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadGrievances = async () => {
      try {
        const data = await fetchMyGrievances();
        setGrievances(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load grievances."));
      } finally {
        setLoading(false);
      }
    };

    loadGrievances();
  }, []);

  const normalized = grievances.map((item, idx) => ({
    id: item.id || item.complaintId || item.grievanceId || `GRV-${1000 + idx}`,
    title: item.title || "Untitled Grievance",
    department: item.department || item.category || "Unassigned Department",
    description: item.description || "No description provided.",
    date: item.date || item.createdAt?.slice(0, 10) || "N/A",
    status: String(item.status || "pending").toLowerCase().replace(/\s+/g, "_"),
  }));

  const filtered = normalized.filter((g) =>
    g.id.toString().toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PortalLayout title="Track Grievance">
      <div className="panel">
        <label htmlFor="track-id">Search by complaint ID</label>
        <input
          id="track-id"
          placeholder="Example: GRV-1022"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && <Alert type="error" message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grievance-grid">
          {filtered.map((g) => (
            <div key={g.id}>
              <GrievanceCard grievance={g} />
              <div className="timeline">
                {["Submitted", "Under Review", "In Progress", "Resolved"].map((step, index) => (
                  <div
                    key={step}
                    className={`timeline-step ${
                      index <= (g.status === "resolved" ? 3 : g.status === "in_progress" ? 2 : 1)
                        ? "done"
                        : ""
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalLayout>
  );
}

export default TrackGrievance;