const passport = require('passport');

const clientURL = 'http://localhost:3000'

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google');

exports.authRedirect = (req, res) => {
   res.redirect(clientURL);
}

exports.logout = (req, res) => {
   req.logout((error) => {
      res.redirect(clientURL);
   });

}

exports.currentUser = (req, res) => {
   res.json(req.user ? req.user : null);
   // if (req.user) {
   //    res.json(req.user);  // Ensure a proper JSON response is sent
   // } else {
   //    res.json({ error: 'Not authenticated' });  // Handle case where user is not authenticated
   // }
}