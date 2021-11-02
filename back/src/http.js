import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {createServer} from 'http';
import {Server} from 'socket.io';

const app = express();
app.use(cors());

const http = createServer(app);

const io = new Server(http, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => { //cria a rota web de conexão websocket
    console.log("Se conectou", socket.id);
});

mongoose.connect("mongodb+srv://rafaelestevam:rafa299102@cluster0.9vg2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.use(express.json());
app.use(require('./routes'));

export {http, io};