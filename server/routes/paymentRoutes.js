const express = require("express");
const {createSubscription} = require ("../controllers/paymentController");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createSubscription', createSubscription);