const express = require("express");
const {createWorkout, getWorkouts, deleteWorkout} = require ("../controllers/workoutController");

const router = express.Router();


router.get("/workouts", getWorkouts);
router.post("/workouts", createWorkout);
router.delete("/workouts/:id", deleteWorkout);

module.exports = router;