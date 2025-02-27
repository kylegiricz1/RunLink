const Workout = require("../models/workout");

const createWorkout = async (req, res) =>{
    const {location,distance,pace,description} = req.body;
    const date= new Date(req.body.date);
    const userId = req.user._id;
    try {
        const newWorkout = new Workout({ location, date, distance, pace, description, createdBy: userId,});
        const populatedWorkout = await newWorkout.populate('createdBy', 'name');
        await populatedWorkout.save();
        res.status(201).json(newWorkout);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find()
          .populate('createdBy', 'name')
          .populate('participants', 'name');
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

const joinWorkout = async(req, res) => {
  try{
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.participants.includes(req.user.id)) {
      return res.status(400).json({ message: "Already joined this workout" });
    }

    if (workout.createdBy.toString() === req.user.id) {
      return res.status(400).json({ message: "Creator cannot join their own workout" });
    }
    
    workout.participants.push(req.user.id);
    await workout.save();

    res.json({ message: "Successfully joined workout", workout });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const leaveWorkout = async(req, res) => {
  return null;
}

module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkout,
    joinWorkout,
    leaveWorkout
  };