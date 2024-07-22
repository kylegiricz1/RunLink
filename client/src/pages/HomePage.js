import React, { useEffect, useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { fetchWorkouts } from '../services/workoutService.js';

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

  return (
    <div>
      <h1>RunLink</h1>
      <WorkoutForm onAddWorkout={handleAddWorkout} />
      <WorkoutList workouts={workouts} />
    </div>
  );
};

export default HomePage;
