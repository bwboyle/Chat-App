const mongoose = require('mongoose');

const connectDB = async () => {
   try {
      // Attempt to connect to database
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB connected')
   } catch (error) {
      // Log error on failed connection
      console.error('MongoDB connection error', error)
   }
};

module.exports = connectDB;