import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listMoods, createMood, deleteMood } from "../services/api";

// PUBLIC_INTERFACE
export function Dashboard() {
  /** Dashboard shows recent entries and quick add form */
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await listMoods();
      setMoods(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setErr("Failed to load moods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    try {
      await createMood({
        date: new Date().toISOString().slice(0, 10),
        mood: Number(mood),
        notes
      });
      setNotes("");
      await load();
    } catch {
      setErr("Failed to create entry");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteMood(id);
      await load();
    } catch {
      setErr("Failed to delete");
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <section className="md:col-span-2 space-y-4">
        <div className="card-fun p-4">
          <h2 className="font-bold text-lg mb-3">Quick Add</h2>
          <form onSubmit={onAdd} className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">Mood</label>
              <input
                type="number"
                min={1}
                max={5}
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Notes</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional note..."
                className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
              />
            </div>
            <div className="sm:col-span-3">
              <button className="btn-fun">Add Entry</button>
            </div>
          </form>
        </div>

        <div className="card-fun p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Recent Entries</h2>
            <Link to="/analytics" className="text-primary underline text-sm">
              View Analytics
            </Link>
          </div>
          {err && <div className="text-sm text-red-600 mb-2">{err}</div>}
          {loading ? (
            <p>Loading...</p>
          ) : moods.length === 0 ? (
            <p className="text-sm">No entries yet. Add your first mood!</p>
          ) : (
            <ul className="space-y-2">
              {moods.map((m) => (
                <li
                  key={m.id || m._id || `${m.date}-${m.mood}`}
                  className="flex items-center justify-between border rounded-lg p-3 border-emerald-100 bg-white"
                >
                  <div>
                    <div className="font-semibold">
                      {m.date || m.createdAt?.slice(0, 10)} • Mood {m.mood}
                    </div>
                    {m.notes && <div className="text-sm">{m.notes}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/moods/${m.id || m._id}/edit`}
                      className="text-sm text-amber-600 underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(m.id || m._id)}
                      className="text-sm text-red-600 underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-fun p-4">
          <h3 className="font-bold mb-2">Tips</h3>
          <p className="text-sm">
            Track consistently to understand your patterns over time. Mood scale
            ranges 1 (low) to 5 (great).
          </p>
        </div>
        <div className="card-fun p-4">
          <h3 className="font-bold mb-2">Shortcuts</h3>
          <ul className="text-sm space-y-1">
            <li>
              <Link className="text-primary underline" to="/moods/new">
                Add detailed entry
              </Link>
            </li>
            <li>
              <Link className="text-primary underline" to="/analytics">
                Open analytics
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
