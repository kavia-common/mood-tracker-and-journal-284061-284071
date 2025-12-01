import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMood, getMood, updateMood } from "../services/api";

// PUBLIC_INTERFACE
export function MoodForm({ mode = "create" }) {
  /** Form for adding or editing a mood entry */
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const isEdit = mode === "edit";

  useEffect(() => {
    const load = async () => {
      if (isEdit && id) {
        try {
          const data = await getMood(id);
          setDate(data.date?.slice(0, 10) || data.date || date);
          setMood(data.mood ?? 3);
          setNotes(data.notes ?? "");
        } catch {
          setErr("Failed to load entry");
        }
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { date, mood: Number(mood), notes };
      if (isEdit) {
        await updateMood(id, payload);
      } else {
        await createMood(payload);
      }
      navigate("/");
    } catch {
      setErr("Failed to save");
    }
  };

  return (
    <div className="max-w-xl mx-auto card-fun p-6">
      <h1 className="text-2xl font-bold mb-2">
        {isEdit ? "Edit Entry" : "Add Entry"}
      </h1>
      <p className="text-sm mb-6">Log your mood and optional note</p>
      {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Mood (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm mb-1">Notes</label>
            <textarea
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 bg-white"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What influenced your mood today?"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-fun" type="submit">
            {isEdit ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-fun border border-emerald-200"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
