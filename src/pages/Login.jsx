import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import Alert from "../components/Alert";
import LoadingSpinner from "../components/LoadingSpinner";
import { loginUser } from "../api/authApi";
import { getApiErrorMessage } from "../api/errorHandler";
import { extractRoleFromToken, setAuthSession } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const data = await loginUser({ email, password });
      const token = data?.token || data?.jwt || data?.accessToken;

      if (!token) {
        throw new Error("Token missing in login response.");
      }

      const role = data?.role || extractRoleFromToken(token) || "CITIZEN";
      setAuthSession(token, role);
      setAlert({ type: "success", message: "Login successful." });

      if (String(role).toUpperCase().includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: getApiErrorMessage(error, "Invalid credentials. Please try again."),
      });
    } finally {
      setLoading(false);
    }
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