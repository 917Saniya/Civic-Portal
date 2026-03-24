import React, { useEffect, useState } from "react";
import PortalLayout from "../components/PortalLayout";
import GrievanceCard from "../components/GrievanceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { grievances as grievanceList } from "../data/mockData";

function TrackGrievance() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGrievances(grievanceList);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filtered = grievances.filter((g) => g.id.toLowerCase().includes(query.toLowerCase()));

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