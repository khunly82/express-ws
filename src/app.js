import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { routes } from './routing/routes.js';
import { IoJwtMiddleware, JwtMiddleware } from './middlewares/jwt.middleware.js';
import { ioRoutes } from './routing/io.routes.js';
import { IoIsLoggedGuard } from './guards/io-is-logged.guards.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { path: '/ws', transports: ['websocket'] });

// vérifie le token et ajoute user au socket
io.use(IoJwtMiddleware);
io.use(IoIsLoggedGuard);
io.use(ioRoutes(io));

app.use(cors());
// vérifie le token et ajoute user à la requète
app.use(JwtMiddleware);
app.use(json());
app.use(routes);

server.listen(process.env.APP_PORT, () => {
  console.log('le serveur ecoute le port ' + process.env.APP_PORT);
});
