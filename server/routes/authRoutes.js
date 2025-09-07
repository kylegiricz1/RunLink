const express = require('express');
const {registerUser, loginUser, getProfile} =  require('../controllers/authController.js');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/auth/register', registerUser);

router.post('/auth/login', loginUser);

router.get("/auth/profile", protect, getProfile);

module.exports = router;
