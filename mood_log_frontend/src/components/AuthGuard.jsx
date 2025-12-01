import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
export function AuthGuard({ children }) {
  /** Guard to ensure a token exists before viewing child routes */
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
