import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    setTimeout(() => {
      const isAdmin = email.toLowerCase().includes("admin");
      localStorage.setItem("token", "demo-auth-token");
      localStorage.setItem("role", isAdmin ? "ADMIN" : "CITIZEN");

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p className="muted">Sign in to continue to your eGrievance account.</p>
        {alert && <Alert type={alert.type} message={alert.message} />}
        <label htmlFor="email">Email</label>
        <div className="input-wrap">
          <Mail size={16} />
          <input
            id="email"
            type="email"
            placeholder="name@govmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-wrap">
          <Lock size={16} />
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary wide" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
        <p className="auth-footer">
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;