import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, UserRound } from "lucide-react";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CITIZEN",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    setTimeout(() => {
      setAlert({ type: "success", message: "Registration successful. Please login." });
      setLoading(false);
      navigate("/login");
    }, 900);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="muted">Register as a citizen or administrator.</p>
        {alert && <Alert type={alert.type} message={alert.message} />}

        <label htmlFor="name">Full Name</label>
        <div className="input-wrap">
          <UserRound size={16} />
          <input
            id="name"
            placeholder="Enter full name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <label htmlFor="email">Email</label>
        <div className="input-wrap">
          <Mail size={16} />
          <input
            id="email"
            type="email"
            placeholder="name@govmail.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-wrap">
          <Lock size={16} />
          <input
            id="password"
            type="password"
            placeholder="Create password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <label htmlFor="role">Role</label>
        <select id="role" onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="CITIZEN">Citizen</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" className="btn btn-primary wide" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Register"}
        </button>
        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;