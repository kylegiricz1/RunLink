import React from 'react';
import '../styles/styles.css';

const WorkoutList = ({ workouts, onDeleteWorkout }) => {
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
          <button onClick={() => onDeleteWorkout(workout._id)}>Delete Workout</button>
          </React.Fragment>
        ))}
      </ul>
      
    </>
  );
};

export default WorkoutList;
