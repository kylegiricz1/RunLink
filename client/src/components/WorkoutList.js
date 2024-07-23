import React from 'react';

const WorkoutList = ({ workouts, onDeleteWorkout }) => {
  return (
    <>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <React.Fragment key={workout._id}>
          <li>
            Distance: {workout.distance} km, Pace: {workout.pace.minutes} min {workout.pace.seconds} sec
          </li>
          <button onClick={() => onDeleteWorkout(workout._id)}>Delete Workout</button>
          </React.Fragment>
        ))}
      </ul>
      
    </>
  );
};

export default WorkoutList;
