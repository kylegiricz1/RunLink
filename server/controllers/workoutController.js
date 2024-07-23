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

const deleteWorkout = async (req, res) => {
  try{
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  }catch(error){
    res.status(500).json({message: error.message});
  }
};

module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkout
  };