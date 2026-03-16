# 🔒 CHECKPOINT v6.0 — REFERENZPUNKT: VOR CLOUD-STREAMING-UMBAU

> **Datum:** 14. März 2026, 20:02 CET  
> **Zustand:** Funktionsfähig, aber GPU noch bei 80°C (Ziel: 0%)

---

## Git-Status

| Eigenschaft | Wert |
|---|---|
| **Branch** | `main` |
| **Letzter Commit** | `a9a5074` |
| **Message** | `fix: Restore native rendering - remove Puppeteer stream` |
| **Working Tree** | Clean |
| **Remote** | `origin/main` (HF Space: Wrzzzrzr/newwebgame) |

### Commit-Historie (letzte 5)
```
a9a5074 fix: Restore native rendering - remove Puppeteer stream
019832e perf: Stream Server V2 - WebSocket binary frames
c1b1bf8 feat: CLOUD RENDERING - Puppeteer+SwiftShader MJPEG stream
8caf899 ULTIMATE STABLE: 0-Stress Performance, Full Playlist
64f0294 ULTIMATE FIX: 0-Load, Black-Screen Fix, Full Playlist
```

---

## Aktueller Technik-Stand

### GameCanvas.tsx GPU-Settings
| Setting | Wert | Effekt |
|---|---|---|
| `dpr` | `[0.5, 1]` | Halbe Render-Auflösung |
| `powerPreference` | `"low-power"` | Integrierte GPU bevorzugt |
| `precision` | `"lowp"` | Minimale Shader-Präzision |
| `antialias` | `false` | Keine Kantenglättung |
| `shadows` | `false` | Keine Schattenberechnung |
| `stencil` | `false` | Kein Stencil-Buffer |
| `frameloop` | `"always"` | Standard (60 FPS) |

### Performance-Messung
| Metrik | Wert |
|---|---|
| **FPS** | 55-58 |
| **GPU-Temperatur** | ~80°C ❌ (Ziel: <50°C) |
| **Steuerung** | WASD + Maus ✅ |
| **NPCs** | Bewegen sich ✅ |
| **HUD** | Vollständig ✅ |

---

## Bekannte Probleme

> [!CAUTION]
> **GPU-Überhitzung (80°C)**: WebGL-Rendering belastet die lokale GPU IMMER. Selbst mit allen Optimierungen (dpr=0.5, lowp, no shadows) sind 80°C zu hoch. Die EINZIGE Lösung für echte 0%: Video-Streaming mit H.264 Hardware-Decoder.

---

## Dateien in diesem Checkpoint

```
super_clean/
├── Dockerfile           (Distroless + server-prod.mjs)
├── package.json         (React + Three.js, KEIN Puppeteer)
├── server/
│   ├── server-prod.mjs  (Static-File Express Server)
│   ├── server.js        (Dev-Server mit Socket.IO)
│   └── stream-server.mjs (DEAKTIVIERT: Puppeteer MJPEG)
├── src/
│   ├── components/game/GameCanvas.tsx  (Ultra-Low GPU Settings)
│   ├── workers/simWorker.ts           (Adaptive Tick-Rate)
│   └── ...
└── dist/                (Build-Output)
```

---

> **Dieser Referenzpunkt markiert den letzten stabilen Stand VOR dem nächsten Umbau auf echtes 0%-Cloud-Streaming.**
