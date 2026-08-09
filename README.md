# Thonse Tours and Travels

Full-stack premium travel website for **Thonse Tours and Travels**, Udupi, Karnataka.
Owner: Mukthar Ahmed · 8880954175

## Structure

- `client/` — React 18 + Vite + Tailwind CSS frontend
- `server/` — Node.js + Express (ES modules) API, with Mongoose that
  automatically falls back to local JSON file storage (`server/data/`)
  whenever `MONGO_URI` is not set

## Running locally

**Server** (http://localhost:5000):

```bash
cd server
npm install
npm run dev
```

Optional: copy `server/.env.example` to `server/.env` and set `MONGO_URI`
to use a real MongoDB database instead of the JSON fallback.

**Client** (http://localhost:5173, proxies `/api` to the server):

```bash
cd client
npm install
npm run dev
```

## API

- `GET /api/fleet` / `GET /api/fleet/:slug` — vehicle fleet
- `POST /api/bookings` / `GET /api/bookings` — ride bookings
- `POST /api/contact` / `GET /api/contact` — contact messages
- `POST /api/chatbot` — keyword-matched FAQ chatbot
- `GET /api/health` — health check

## Notes

- The hero background uses a CSS Ken-Burns animation on a still image.
  To switch to a real video, pass `videoSrc="/videos/hero.mp4"` to the
  `<Hero />` component instead of `imageSrc` (see `client/src/components/Hero.jsx`).
- All fleet data is served from the backend and fetched dynamically —
  never hardcoded in components.
