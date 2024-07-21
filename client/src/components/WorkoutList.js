import React, { useEffect, useState } from 'react';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/workouts');
        if (!response.ok) throw new Error('Something went wrong!');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();
  }, []);

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
