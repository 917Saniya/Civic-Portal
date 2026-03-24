import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, LogOut, Menu, UserCircle } from "lucide-react";

function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="top-nav">
      <div className="nav-left">
        <button className="icon-btn mobile-only" onClick={onToggleSidebar} type="button">
          <Menu size={20} />
        </button>
        <Link to="/home" className="brand">
          <Building2 size={20} />
          <span>Civic Portal</span>
        </Link>
      </div>

      <div className="nav-links desktop-only">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/submit">Submit Grievance</Link>
        <Link to="/track">Track Grievance</Link>
        <Link to="/profile">Profile</Link>
        {role === "ADMIN" && <Link to="/admin">Admin</Link>}
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="icon-btn" aria-label="Profile">
              <UserCircle size={19} />
            </Link>
            <button onClick={logout} type="button" className="btn btn-primary nav-logout">
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;