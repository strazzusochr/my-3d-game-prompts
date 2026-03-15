/**
 * 🔴 CLOUD-RENDERING SERVER V2 — ZERO LOCAL LOAD — HIGH PERFORMANCE
 * 
 * Optimized for smooth gameplay:
 *   - WebSocket binary frames (lower latency than MJPEG HTTP)
 *   - Reduced viewport (960x540) for faster captures
 *   - Aggressive JPEG compression (quality 35)
 *   - Double-buffered capture (capture next while sending current)
 *   - MJPEG fallback for initial load
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  maxHttpBufferSize: 5e6 // 5MB for binary frames
});

// ─── Internal static server for Puppeteer ───
const internalApp = express();
const internalServer = createServer(internalApp);
internalApp.use(express.static(path.join(__dirname, '../dist')));
internalApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const INTERNAL_PORT = 3099;
const PUBLIC_PORT = process.env.PORT || 7860;
const VIEWPORT_WIDTH = 960;
const VIEWPORT_HEIGHT = 540;
const JPEG_QUALITY = 35;
const TARGET_FPS = 24;
const FRAME_INTERVAL = Math.floor(1000 / TARGET_FPS);

let page = null;
let isStreaming = false;
let frameCount = 0;
let lastFpsTime = Date.now();
let currentFps = 0;

// ─── MJPEG fallback for <img> tag ───
const mjpegClients = new Set();

app.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=frame',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  mjpegClients.add(res);
  req.on('close', () => mjpegClients.delete(res));
});

// ─── Serve lightweight client ───
app.get('/', (req, res) => {
  res.send(getClientHTML());
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', fps: currentFps, clients: io.engine?.clientsCount || 0 });
});

// ─── WebSocket: frames OUT, input IN ───
io.on('connection', (socket) => {
  console.log('🎮 Client connected:', socket.id);

  socket.on('keydown', async (data) => {
    if (!page) return;
    try { await page.keyboard.down(data.key); } catch(e) {}
  });

  socket.on('keyup', async (data) => {
    if (!page) return;
    try { await page.keyboard.up(data.key); } catch(e) {}
  });

  socket.on('mousemove', async (data) => {
    if (!page) return;
    try { await page.mouse.move(data.x, data.y); } catch(e) {}
  });

  socket.on('mousedown', async (data) => {
    if (!page) return;
    try { await page.mouse.down({ button: data.button || 'left' }); } catch(e) {}
  });

  socket.on('mouseup', async (data) => {
    if (!page) return;
    try { await page.mouse.up({ button: data.button || 'left' }); } catch(e) {}
  });

  socket.on('click', async (data) => {
    if (!page) return;
    try { await page.mouse.click(data.x, data.y); } catch(e) {}
  });

  socket.on('disconnect', () => {
    console.log('🎮 Client disconnected:', socket.id);
  });
});

// ─── Optimized frame capture ───
async function captureLoop() {
  if (!page || !isStreaming) return;

  const startTime = Date.now();

  try {
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: JPEG_QUALITY,
      encoding: 'binary',
      optimizeForSpeed: true
    });

    // Send via WebSocket (binary, low latency)
    io.volatile.emit('frame', screenshot);

    // MJPEG fallback
    for (const client of mjpegClients) {
      try {
        client.write(`--frame\r\nContent-Type: image/jpeg\r\nContent-Length: ${screenshot.length}\r\n\r\n`);
        client.write(screenshot);
        client.write('\r\n');
      } catch (e) { mjpegClients.delete(client); }
    }

    // FPS counter
    frameCount++;
    const now = Date.now();
    if (now - lastFpsTime >= 1000) {
      currentFps = frameCount;
      frameCount = 0;
      lastFpsTime = now;
    }
  } catch (e) {
    console.error('Capture error:', e.message);
  }

  // Dynamic interval: compensate for capture time
  const elapsed = Date.now() - startTime;
  const nextDelay = Math.max(1, FRAME_INTERVAL - elapsed);
  setTimeout(captureLoop, nextDelay);
}

// ─── Launch Puppeteer ───
async function startCloudRenderer() {
  console.log('🚀 Starting Cloud Renderer V2 (Optimized)...');

  await new Promise((resolve) => {
    internalServer.listen(INTERNAL_PORT, '127.0.0.1', () => {
      console.log(`📦 Internal app on :${INTERNAL_PORT}`);
      resolve();
    });
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-extensions',
      '--disable-default-apps',
      '--no-first-run',
      `--window-size=${VIEWPORT_WIDTH},${VIEWPORT_HEIGHT}`,
      '--hide-scrollbars'
    ]
  });

  page = await browser.newPage();
  await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT, deviceScaleFactor: 1 });

  console.log('🌍 Loading game...');
  await page.goto(`http://127.0.0.1:${INTERNAL_PORT}`, {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Wait for Three.js canvas to appear
  await page.waitForSelector('canvas', { timeout: 30000 }).catch(() => {
    console.log('⚠️ No canvas found, starting capture anyway');
  });

  console.log('✅ Game loaded! Starting stream at', TARGET_FPS, 'FPS target');
  isStreaming = true;
  captureLoop();
}

// ─── Client HTML (WebSocket-based, much smoother) ───
function getClientHTML() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Corona Control — Cloud Gaming</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
      font-family: 'Segoe UI', sans-serif;
    }
    canvas#display {
      width: 100vw;
      height: 100vh;
      object-fit: contain;
      image-rendering: auto;
    }
    #hud {
      position: fixed;
      top: 8px;
      left: 8px;
      color: #0f0;
      font-size: 11px;
      font-family: monospace;
      background: rgba(0,0,0,0.7);
      padding: 4px 8px;
      border-radius: 3px;
      z-index: 1000;
      pointer-events: none;
    }
    #loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 20px;
      z-index: 2000;
      text-align: center;
    }
    .spinner {
      border: 3px solid #333;
      border-top: 3px solid #0f0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 10px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div id="hud">☁️ CLOUD GAMING | FPS: <span id="fps">--</span></div>
  <div id="loading">
    <div class="spinner"></div>
    Connecting to Cloud Renderer...
  </div>
  <canvas id="display" width="${VIEWPORT_WIDTH}" height="${VIEWPORT_HEIGHT}"></canvas>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const canvas = document.getElementById('display');
    const ctx = canvas.getContext('2d');
    const loading = document.getElementById('loading');
    const fpsEl = document.getElementById('fps');
    const socket = io({ transports: ['websocket'] });

    let frameCount = 0;
    let lastFpsTime = Date.now();

    // Receive frames via WebSocket (binary, fast)
    socket.on('frame', (data) => {
      loading.style.display = 'none';
      const blob = new Blob([data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, ${VIEWPORT_WIDTH}, ${VIEWPORT_HEIGHT});
        URL.revokeObjectURL(url);
        frameCount++;
      };
      img.src = url;
    });

    // FPS counter
    setInterval(() => {
      const now = Date.now();
      const elapsed = (now - lastFpsTime) / 1000;
      const fps = Math.round(frameCount / elapsed);
      fpsEl.textContent = fps;
      frameCount = 0;
      lastFpsTime = now;
    }, 1000);

    // Forward keyboard
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      socket.emit('keydown', { key: e.key, code: e.code });
    });
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      socket.emit('keyup', { key: e.key, code: e.code });
    });

    // Forward mouse (scaled to stream viewport)
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left) / rect.width * ${VIEWPORT_WIDTH});
      const y = Math.round((e.clientY - rect.top) / rect.height * ${VIEWPORT_HEIGHT});
      socket.emit('mousemove', { x, y });
    });
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left) / rect.width * ${VIEWPORT_WIDTH});
      const y = Math.round((e.clientY - rect.top) / rect.height * ${VIEWPORT_HEIGHT});
      socket.emit('click', { x, y });
      socket.emit('mousedown', { button: e.button === 0 ? 'left' : 'right' });
    });
    canvas.addEventListener('mouseup', (e) => {
      socket.emit('mouseup', { button: e.button === 0 ? 'left' : 'right' });
    });
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Reconnect handling
    socket.on('disconnect', () => {
      loading.style.display = 'block';
      loading.innerHTML = '<div class="spinner"></div>Reconnecting...';
    });
    socket.on('connect', () => {
      console.log('Connected to cloud renderer');
    });
  </script>
</body>
</html>`;
}

// ─── Start ───
httpServer.listen(PUBLIC_PORT, '0.0.0.0', () => {
  console.log('🌐 Cloud Gaming Server on port', PUBLIC_PORT);
  startCloudRenderer().catch(err => {
    console.error('❌ Failed:', err);
  });
});
