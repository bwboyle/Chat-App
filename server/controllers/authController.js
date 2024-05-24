const passport = require('passport');

const clientURL = 'http://localhost:3000'

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google');

exports.authRedirect = (req, res) => {
   console.log(req);
   res.redirect(clientURL);
}

exports.logout = (req, res) => {
   req.logout();
}

// exports.currentUser = (req, res) => {
//    if (req.user) {
//       res.json(req.user);  // Ensure a proper JSON response is sent
//    } else {
//       res.json({ error: 'Not authenticated' });  // Handle case where user is not authenticated
//    }
// }