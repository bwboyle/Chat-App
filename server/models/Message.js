const mongoose = require('mongoose');
const User = require('./User');

const messageSchema = new mongoose.Schema({
   user: { type: mongoose.ObjectId, ref: 'User' },
   message: { type: String, required: true },
   timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);