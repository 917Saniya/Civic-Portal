import React from "react";
import { CalendarDays, Landmark, Hash } from "lucide-react";
import StatusBadge from "./StatusBadge";

function GrievanceCard({ grievance }) {
  return (
    <article className="grievance-card">
      <div className="card-top">
        <h3>{grievance.title}</h3>
        <StatusBadge status={grievance.status} />
      </div>
      <p>{grievance.description}</p>
      <div className="grievance-meta">
        <span>
          <Hash size={14} />
          {grievance.id}
        </span>
        <span>
          <Landmark size={14} />
          {grievance.department}
        </span>
        <span>
          <CalendarDays size={14} />
          {grievance.date}
        </span>
      </div>
    </article>
  );
}

export default GrievanceCard;
