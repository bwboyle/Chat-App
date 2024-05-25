const Message = require('../models/Message');

const getMessages = async (req, res) => {
   try {
      const messages = await Message.find().sort({ timestamp: 1 });
      res.json(messages);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
   }
};

const createMessage = async (data) => {
   try {
      const newMessage = await Message.create(data);
   } catch (error) {
      console.error('Error creating message', error);
   }
};

module.exports = { getMessages, createMessage };