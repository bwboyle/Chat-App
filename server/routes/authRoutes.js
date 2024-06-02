const express = require('express');
// const authController = require('../controllers/authController');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client();
const router = express.Router();

// Middleware for verifing Google OAuth credential
const verifyToken = async (token) => {
   try {
      const ticket = await client.verifyIdToken({
         idToken: token,
         audience: process.env.GOOGLE_CLIENT_ID,
      });
      return [ticket.getUserId(), ticket.getPayload()];
   } catch (error) {
      throw new Error('Error validating credential: ', error);
   }
}

router.get('/current_user', async (req, res) => {
   try {
      // Get access token from request headers
      const token = req.headers.authorization.split(' ')[1];
      const [id, userData] = await verifyToken(token);

      let user = await User.findOne({ googleId: id });
      if (!user) {
         user = await User.create({
            googleId: id,
            displayName: userData.name,
            email: userData.email,
            photoURL: userData.picture,
         });
      }

      res.status(200).json({ user: user });

   } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
   }


   // Store user in database if valid token


   // console.log(decodedToken);
   // await verifyToken(token)
   //    .then((decodedToken) => {
   //       console.log(decodedToken);
   //       res.status(200).json('done');
   //    })
   //    .catch((err) => res.status(500).json({ error: err }));

});

// router.get('/google', authController.googleAuth);
// router.get('/google/callback', authController.googleAuthCallback, authController.authRedirect);
// router.get('/logout', authController.logout);
// router.get('/current_user', authController.currentUser);

module.exports = router;