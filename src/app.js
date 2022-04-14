import express from 'express';
import apiRouter from './api';
import http from 'http';
import { Server } from "socket.io";
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(express.urlencoded());
const server = http.createServer(app);
const io = new Server(server);

const file1 = require("./sockets")(io)

app.use("/", apiRouter)

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

server.listen(4000, () => {
    console.log('listening on ' + process.env.PORT);
});