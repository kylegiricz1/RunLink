const Workout = require("../models/workout");
const User = require("../models/user");
const createWorkout = async (req, res) =>{
    const {location,distance,pace,description} = req.body;
    const date= new Date(req.body.date);
    const userId = req.user._id;
    try {
        if (!location || location.type !== 'Point' || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
          return res.status(400).json({ message: 'A valid map location is required' });
        }
        if (Number(distance) <= 0 || Number(pace?.minutes) < 0 || Number(pace?.seconds) < 0 || Number(pace?.seconds) > 59) {
          return res.status(400).json({ message: 'Distance and pace must be valid values' });
        }
        if (Number.isNaN(date.getTime()) || date <= new Date()) {
          return res.status(400).json({ message: 'Choose a future workout date' });
        }
        const newWorkout = new Workout({ location, date, distance, pace, description, createdBy: userId,});
        await newWorkout.save();
        await newWorkout.populate('createdBy', 'name');
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
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    if (workout.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the organizer can delete this workout' });
    }
    await workout.deleteOne();
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
    await workout.populate('participants', 'name');
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { totalLinks: 1 } },
      { new: true }
    );
    console.log("Updated User:", updatedUser);

    res.json({ message: "Successfully joined workout", workout });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const leaveWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (!workout.participants.some(participant => participant._id.toString() === req.user.id)) {
      return res.status(400).json({ message: "Haven't joined workout" });
    }

    workout.participants = workout.participants.filter(participant => participant._id.toString() !== req.user.id);

    await workout.save();
    await workout.populate('participants', 'name');

    await User.findByIdAndUpdate(req.user.id, { $inc: { totalLinks: -1 } });
    res.status(200).json({ message: "Left workout successfully", workout});

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkout,
    joinWorkout,
    leaveWorkout
  };
