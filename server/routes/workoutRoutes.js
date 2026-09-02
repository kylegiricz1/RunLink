const express = require("express");
const {createWorkout, getWorkouts, deleteWorkout, joinWorkout, leaveWorkout} = require ("../controllers/workoutController");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.get("/workouts", protect, getWorkouts);
router.post("/workouts", protect, createWorkout);
router.delete("/workouts/:id", protect, deleteWorkout);

router.post('/workouts/:id/join', protect, joinWorkout);
router.post('/workouts/:id/leave', protect, leaveWorkout);

module.exports = router;
