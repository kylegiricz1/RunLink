const express = require("express");
const {createWorkout, getWorkouts} = require ("../controllers/workoutController");
const router = express.Router();


router.get("/workouts", getWorkouts);
router.post("/workouts", createWorkout);

module.exports = router;