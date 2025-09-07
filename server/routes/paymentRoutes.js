const express = require("express");
import createSubscription from "../controllers/paymentController";
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createSubscription', createSubscription);