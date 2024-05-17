const dotenv = require('dotenv');
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const http = require('http');
const chatSocket = require('./sockets/chat');
const { Server } = require('socket.io');

dotenv.config();

// MongoDB connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', messageRoutes);

// Configure server
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
   }
});

// Setup socket.io
chatSocket(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});