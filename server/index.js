const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const http = require('http');
const chatSocket = require('./sockets/chat');
const { Server } = require('socket.io');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();
require('./config/passport');

// MongoDB connection
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
console.log('Passport session initialized')

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

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