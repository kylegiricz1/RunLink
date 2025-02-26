const express = require('express');
const {registerUser, getUsers, loginUser} =  require('../controllers/authController.js');

const router = express.Router();

router.post('/auth/register', registerUser);

router.post('/auth/login', loginUser);

router.get('/auth', getUsers);

module.exports = router;
