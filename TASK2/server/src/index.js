import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // React dev server
    methods: ["GET", "POST"]
  }
});

// Store connected users and messages (in-memory storage)
const users = new Map();
const messages = [];

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Handle user joining
  socket.on('join', (username) => {
    users.set(socket.id, { username, id: socket.id });
    console.log(`User ${username} joined with socket ID: ${socket.id}`);
    io.emit('userList', Array.from(users.values()));
    io.emit('message', {
      type: 'system',
      content: `${username} joined the chat`,
      timestamp: new Date()
    });
  });

  // Handle messages
  socket.on('message', (message) => {
    const user = users.get(socket.id);
    const messageObj = {
      id: Date.now(),
      user: user.username,
      content: message,
      timestamp: new Date()
    };
    messages.push(messageObj);
    io.emit('message', messageObj);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      console.log(`User ${user.username} disconnected`);
      io.emit('message', {
        type: 'system',
        content: `${user.username} left the chat`,
        timestamp: new Date()
      });
      users.delete(socket.id);
      io.emit('userList', Array.from(users.values()));
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 