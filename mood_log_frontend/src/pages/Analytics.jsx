import React, { useEffect, useMemo, useState } from "react";
import { listMoods } from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// PUBLIC_INTERFACE
export function Analytics() {
  /** Analytics of mood over time using recharts */
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listMoods();
        const items = Array.isArray(data) ? data : data?.items || [];
        setMoods(items);
      } catch {
        setMoods([]);
      }
    })();
  }, []);

  const chartData = useMemo(() => {
    return moods
      .map((m) => ({
        date: m.date || m.createdAt?.slice(0, 10),
        mood: Number(m.mood)
      }))
      .filter((d) => d.date)
      .sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [moods]);

  const avgMood =
    chartData.length > 0
      ? (chartData.reduce((s, d) => s + d.mood, 0) / chartData.length).toFixed(2)
      : "-";

  return (
    <div className="space-y-4">
      <div className="card-fun p-4">
        <h1 className="text-xl font-bold mb-2">Analytics</h1>
        <p className="text-sm">
          Average mood: <span className="font-semibold">{avgMood}</span>
        </p>
      </div>

      <div className="card-fun p-4">
        {chartData.length === 0 ? (
          <p className="text-sm">No data to show. Add some entries.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
