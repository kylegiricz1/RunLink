import React, { useState } from 'react';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';

const MainPage = () => {
  const [workouts, setWorkouts] = useState([]);

  const handleWorkoutCreated = (newWorkout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
  };

  return (
    <div>
      <h1>Workout Tracker</h1>
      <WorkoutForm onWorkoutCreated={handleWorkoutCreated} />
      <WorkoutList workouts={workouts} />
    </div>
  );
};

export default MainPage;
