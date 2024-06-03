const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth route
router.get('/google', passport.authenticate('google'), (req, res) => {
   req.login(req.user, err => { if (err) return next(err) });
   res.redirect(process.env.CLIENT_URL);
});

// Returns the currently signed in user
router.get('/user', (req, res) => {
   if (req.isAuthenticated()) {
      res.status(200).json({ user: req.user });
   } else {
      res.status(200).json({ user: null });
   }
});

// Logout of session
router.post('/logout', (req, res) => {
   req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Logout successful" })
   });
});

module.exports = router;