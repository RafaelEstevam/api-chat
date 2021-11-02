import express from 'express';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import {routes} from './routes';

import './database';

const app = express();

const http = createServer(app);

const io = new Server(http, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket: Socket) => {
    console.log('Conectou', socket.id);
});

app.use(express.json());
app.use(routes);

export {http, io};