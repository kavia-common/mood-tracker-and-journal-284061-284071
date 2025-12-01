import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./index.css";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MoodForm } from "./pages/MoodForm";
import { Analytics } from "./pages/Analytics";
import { AuthGuard } from "./components/AuthGuard";

// PUBLIC_INTERFACE
function App() {
  /** Root app sets theme and routes */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="bg-[var(--surface)] border-b border-emerald-100">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400 shadow-neon" />
              <span className="font-bold text-lg">Moodly</span>
            </Link>
            <nav className="flex items-center gap-3">
              <Link className="text-sm hover:text-primary" to="/">Dashboard</Link>
              <Link className="text-sm hover:text-primary" to="/analytics">Analytics</Link>
              <Link className="text-sm hover:text-primary" to="/moods/new">Add Mood</Link>
              <ThemeSwitch theme={theme} onToggle={toggleTheme} />
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/"
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path="/analytics"
              element={
                <AuthGuard>
                  <Analytics />
                </AuthGuard>
              }
            />
            <Route
              path="/moods/new"
              element={
                <AuthGuard>
                  <MoodForm mode="create" />
                </AuthGuard>
              }
            />
            <Route
              path="/moods/:id/edit"
              element={
                <AuthGuard>
                  <MoodForm mode="edit" />
                </AuthGuard>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function ThemeSwitch({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="btn-fun flex items-center gap-2"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

export default App;
