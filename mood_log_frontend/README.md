# Mood Log Frontend (React + Tailwind)

Playful Neon Fun themed React frontend for logging moods, notes, and viewing analytics.

## Stack
- React 18 with react-router-dom v6
- Tailwind CSS 3 (Neon Fun theme)
- Axios for API calls (JWT via localStorage)
- Recharts for simple analytics

## Quickstart

1) Install dependencies
   npm install

2) Configure environment
   - Copy `.env.example` to `.env`
   - Set REACT_APP_API_URL to your backend URL (e.g. http://localhost:5000)

3) Run dev server
   npm start
   Open http://localhost:3000

4) Production build
   npm run build

## Environment
- REACT_APP_API_URL: Base URL for backend API

## Features
- Auth pages: Login, Signup
- Protected routes with AuthGuard
- Dashboard: quick add, recent entries list
- MoodForm: add/edit entries
- Analytics: line chart of mood over time

## Theme
Application style: Playful — vibrant colors, rounded corners, lively gradients.
Palette:
- primary: #10B981
- secondary: #F59E0B
- error: #EF4444
- background: #F0FDF4
- surface: #FFFFFF
- text: #374151

You can tweak theme in `tailwind.config.js` and utility classes in `src/index.css`.

## Routing
- /login, /signup (public)
- / (Dashboard) protected
- /moods/new (create) protected
- /moods/:id/edit (edit) protected
- /analytics protected

## API Client
Located at `src/services/api.js`
- Automatically attaches Authorization: Bearer <token> from localStorage
- login(), signup(), listMoods(), createMood(), getMood(), updateMood(), deleteMood(), getProfile(), logout()

