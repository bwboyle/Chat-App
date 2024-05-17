const { createMessage } = require('../controllers/messageController');

const chatSocket = (io) => {
   io.on('connection', (socket) => {
      console.log('New client connected');

      // Send chat history
      socket.on('loadMessages', async () => {
         const messages = await Message.find().sort({ timestamp: 1 });
         socket.emit('chatHistory', messages);
      });

      // Listen for new mesages
      socket.on('sendMessage', (data) => {
         createMessage(data);
         io.emit('receiveMessage', data);
      });

      socket.on('disconnect', () => {
         console.log('Client disconnected')
      });
   });
};

module.exports = chatSocket;