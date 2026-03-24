import React from "react";
import { Navigate } from "react-router-dom";
import { getRole, getToken, isTokenExpired, clearAuthSession } from "../utils/auth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = getToken();
  const role = getRole();

  if (!token || isTokenExpired(token)) {
    clearAuthSession();
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;