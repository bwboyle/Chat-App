const express = require('express');
// const { getMessages } = require('../controllers/messageController');
const Message = require('../models/Message');

const router = express.Router();

router.get('/all', async (req, res) => {
   if (req.isAuthenticated()) {
      await Message.find().sort({ timestamp: 1 }).populate('user')
         .then((messages) => res.status(200).json({ messages: messages }))
         .catch((err) => res.status(500).json({ error: err }));
   } else {
      res.status(401).json({ message: 'Unauthorized' });
   }
});

module.exports = router;