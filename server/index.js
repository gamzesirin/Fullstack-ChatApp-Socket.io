// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', 
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('room', (room) => {
        socket.join(room);
        console.log(`${socket.id} joined room ${room}`);
    });

    socket.on('sendMessage', (data) => {
        io.to(data.room).emit('messageReturn', data); 
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
