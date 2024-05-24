const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const http = require('http');
const chatSocket = require('./sockets/chat');
const { Server } = require('socket.io');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
require('./config/passport');

// MongoDB connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', messageRoutes);
app.use('/auth', authRoutes);

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