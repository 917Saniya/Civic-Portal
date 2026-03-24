import React from "react";

const map = {
  pending: "status-pending",
  in_progress: "status-progress",
  resolved: "status-resolved",
  rejected: "status-rejected",
};

function StatusBadge({ status }) {
  const key = status?.toLowerCase() || "pending";
  const text = key.replace("_", " ");
  return <span className={`status-badge ${map[key] || map.pending}`}>{text}</span>;
}

export default StatusBadge;
