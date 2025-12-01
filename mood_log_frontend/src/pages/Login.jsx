import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

// PUBLIC_INTERFACE
export function Login() {
  /** Login screen for existing users */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card-fun p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
      <p className="text-sm mb-6">Log in to track your mood journey</p>
      {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <button className="btn-fun w-full" disabled={loading} type="submit">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        New here?{" "}
        <Link className="text-primary underline" to="/signup">
          Create an account
        </Link>
      </p>
    </div>
  );
}
