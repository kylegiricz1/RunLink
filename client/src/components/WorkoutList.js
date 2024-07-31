// src/components/WorkoutList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkoutById } from '../features/workouts/workoutsSlice';

import '../styles/styles.css'

const WorkoutList = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts.workouts);

  const handleDeleteWorkout = (id) => {
    dispatch(deleteWorkoutById(id));
  };

  return (
    <>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <React.Fragment key={workout._id}>
            <li>
              Location: {workout.location}, Date: {new Date(workout.date).toLocaleDateString()}, Distance: {workout.distance} km, Pace: {workout.pace.minutes} min {workout.pace.seconds} sec,
              Description: {workout.description}
            </li>
            <button onClick={() => handleDeleteWorkout(workout._id)}>Delete Workout</button>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default WorkoutList;
