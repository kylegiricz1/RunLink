import React, { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { fetchWorkouts, deleteWorkout } from '../services/workoutService.js';

const HomePage = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await fetchWorkouts();
      setWorkouts(data);
    };

    getWorkouts();
  }, []);

  const handleAddWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  const handleDeleteWorkout = async (id) => {
    try {
      await deleteWorkout(id)
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error('There was an error deleting the workout!', error);
    }
  };

  return (
    <div>
      <h1>RunLink</h1>
      <WorkoutForm onAddWorkout={handleAddWorkout} />
      <WorkoutList workouts={workouts} onDeleteWorkout={handleDeleteWorkout}/>
    </div>
  );
};

export default HomePage;
