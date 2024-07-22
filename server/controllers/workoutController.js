const Workout = require("../models/workout");

const createWorkout = async (req, res) =>{
    const {distance,pace}= req.body;
    try {
        const newWorkout = new Workout({ distance, pace });
        await newWorkout.save();
        res.status(201).json(newWorkout);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
       
      } catch (error) {
        res.status(500).json({ message: error.message });
        
      }
};

module.exports = {
    createWorkout,
    getWorkouts
  };