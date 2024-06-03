const express = require('express');
// const { getMessages } = require('../controllers/messageController');
const Message = require('../models/Message');

const router = express.Router();

router.get('/all', (req, res) => {
   if (req.isAuthenticated()) {
      Message.find().sort({ timestamp: 1 }).populate('user')
         .then((messages) => console.log(messages))
   } else {
      res.status(401).json({ message: 'Unauthorized' })
   }
});

module.exports = router;