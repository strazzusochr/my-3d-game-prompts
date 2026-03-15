import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false, // Erlaubt das Einbetten in Hugging Face Iframes (Fix für Black-Screen)
    crossOriginEmbedderPolicy: false
}));
app.use(compression());

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

let worldState = { inGameTime: '06:00', tension: 10 };

io.on('connection', (socket) => {
    socket.emit('init-state', worldState);
    socket.on('update-time', (time) => {
        worldState.inGameTime = time;
        socket.broadcast.emit('time-sync', time);
    });
});

const PORT = process.env.PORT || 7860;

server.listen(PORT, '0.0.0.0', () => {
    console.log('PROD-SERVER: listening on port ' + PORT);
});
