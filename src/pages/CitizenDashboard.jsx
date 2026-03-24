import React from "react";
import { CircleCheckBig, CircleDashed, CircleEllipsis, FileWarning } from "lucide-react";
import PortalLayout from "../components/PortalLayout";
import StatCard from "../components/StatCard";
import GrievanceCard from "../components/GrievanceCard";
import { grievances, stats } from "../data/mockData";

function CitizenDashboard() {
  return (
    <PortalLayout title="Citizen Dashboard">
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
        <div className="grievance-grid">
          {grievances.map((g) => (
            <GrievanceCard key={g.id} grievance={g} />
          ))}
        </div>
      </section>
    </PortalLayout>
  );
}

export default CitizenDashboard;