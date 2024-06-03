const { createMessage } = require('../controllers/messageController');
const Message = require('../models/Message');

const chatSocket = (io) => {
   io.on('connection', (socket) => {
      console.log('New client connected');

      // Listen for new mesages
      socket.on('sendMessage', async (data) => {
         await Message.create(data).then(io.emit('receiveMessage', data))
      });

      socket.on('disconnect', () => {
         console.log('Client disconnected')
      });
   });
};

module.exports = chatSocket;