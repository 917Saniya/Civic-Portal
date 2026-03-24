import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  FilePlus2,
  Search,
  User,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";
import { getRole } from "../utils/auth";

const links = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/submit", label: "Submit Grievance", icon: FilePlus2 },
  { to: "/track", label: "Track Grievance", icon: Search },
  { to: "/complaints", label: "My Complaints", icon: FolderKanban },
  { to: "/profile", label: "Profile", icon: User },
];

function Sidebar({ open, onClose }) {
  const location = useLocation();
  const role = getRole();

  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">Citizen Features</div>
        <div className="sidebar-links">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={location.pathname === item.to ? "active" : ""}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
          {role === "ADMIN" && (
            <Link
              to="/admin"
              onClick={onClose}
              className={location.pathname === "/admin" ? "active" : ""}
            >
              <ShieldCheck size={16} />
              Admin Dashboard
            </Link>
          )}
        </div>
      </aside>
      {open && <button className="sidebar-backdrop" type="button" onClick={onClose} />}
    </>
  );
}

export default Sidebar;
