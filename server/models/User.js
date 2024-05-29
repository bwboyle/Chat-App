const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   googleId: { type: String, required: true, unique: true },
   displayName: { type: String, required: true },
   email: { type: String, required: true },
   photoURL: { type: String }
});

module.exports = mongoose.model('User', userSchema);