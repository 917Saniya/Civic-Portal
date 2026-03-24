import React from "react";

function StatCard({ title, value, icon, color }) {
  const Icon = icon;
  return (
    <article className="stat-card">
      <div>
        <p className="muted">{title}</p>
        <h3>{value}</h3>
      </div>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        <Icon size={18} color="#fff" />
      </div>
    </article>
  );
}

export default StatCard;
