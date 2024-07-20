const Workout = require("../models/workout")

const createWorkout = async () =>{
    const {distance,pace}= req.body;
    try {
        const newWorkout = new Workout({ distance, pace });
        await newWorkout.save();
        res.status(201).json(newWorkout);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
