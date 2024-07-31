// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { fetchAllWorkouts } from '../features/workouts/workoutsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const workoutsStatus = useSelector((state) => state.workouts.status);

  useEffect(() => {
    if (workoutsStatus === 'idle') {
      dispatch(fetchAllWorkouts());
    }
  }, [workoutsStatus, dispatch]);

  return (
    <div>
      <h1>RunLink</h1>
      <WorkoutForm/>
      <WorkoutList />
    </div>
  );
};

export default HomePage;
