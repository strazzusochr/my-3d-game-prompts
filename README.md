---
title: Newwebgame
emoji: 🚀
colorFrom: indigo
colorTo: blue
sdk: docker
pinned: false
short_description: webgame
app_port: 7860
---

# GOD UNIVERSE MATRIXX 🌌

3D Web Game powered by React Three Fiber + Next.js

## Clone-safe Server Ports

To avoid port collisions after cloning on another machine, all relevant ports are configurable via environment variables.

1. Copy `.env.example` to `.env`
2. Adjust the values if a port is already occupied
3. Start as usual with `npm run dev:all` or `npm run stream`

Used variables:

- `VITE_PORT` (default `5173`)
- `SOCKET_PORT` (default `3000`)
- `PORT` (default `7860`)
- `INTERNAL_PORT` (default `3099`)
- `RENDER_BACKEND` (`hardware` recommended, fallback: `software`)
