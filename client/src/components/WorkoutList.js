import React from 'react';

const WorkoutList = ({ workouts }) => {
  return (
    <>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <>
          <li key={workout._id}>
            Distance: {workout.distance} km, Pace: {workout.pace.minutes} min {workout.pace.seconds} sec
          </li>
          <button>Delete Workout</button>
          </>
        ))}
      </ul>
      
    </>
  );
};

export default WorkoutList;
