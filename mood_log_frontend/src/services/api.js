import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper functions

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Authenticate user, store token */
  const { data } = await api.post("/auth/login", { email, password });
  if (data?.token) localStorage.setItem("token", data.token);
  return data;
}

// PUBLIC_INTERFACE
export async function signup(name, email, password) {
  /** Create account */
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data;
}

// PUBLIC_INTERFACE
export async function getProfile() {
  /** Get current user profile */
  const { data } = await api.get("/auth/me");
  return data;
}

// PUBLIC_INTERFACE
export async function listMoods() {
  /** Get mood entries */
  const { data } = await api.get("/moods");
  return data;
}

// PUBLIC_INTERFACE
export async function createMood(payload) {
  /** Create a mood entry: {date, mood(1-5), notes} */
  const { data } = await api.post("/moods", payload);
  return data;
}

// PUBLIC_INTERFACE
export async function getMood(id) {
  /** Get one mood entry */
  const { data } = await api.get(`/moods/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export async function updateMood(id, payload) {
  /** Update mood entry */
  const { data } = await api.put(`/moods/${id}`, payload);
  return data;
}

// PUBLIC_INTERFACE
export async function deleteMood(id) {
  /** Delete mood entry */
  const { data } = await api.delete(`/moods/${id}`);
  return data;
}

// PUBLIC_INTERFACE
export function logout() {
  /** Clear local session token */
  localStorage.removeItem("token");
}

export default api;
