import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, login } from "../services/api";

// PUBLIC_INTERFACE
export function Signup() {
  /** Signup screen for new users */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await signup(name, email, password);
      // Directly login after signup for smoother UX
      await login(email, password);
      navigate("/", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto card-fun p-6">
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>
      <p className="text-sm mb-6">Start your mood tracking journey</p>
      {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
            required
          />
        </div>
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
            placeholder="Create a password"
            required
          />
        </div>
        <button className="btn-fun w-full" disabled={loading} type="submit">
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link className="text-primary underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
