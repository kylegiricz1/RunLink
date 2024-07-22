import React from 'react';

const WorkoutList = ({ workouts }) => {
  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            Distance: {workout.distance} km, Pace: {workout.pace.minutes} min {workout.pace.seconds} sec
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
