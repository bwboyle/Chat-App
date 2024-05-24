const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback, authController.authRedirect);
router.get('/logout', authController.logout);
// router.get('/current_user', authController.currentUser);

module.exports = router;