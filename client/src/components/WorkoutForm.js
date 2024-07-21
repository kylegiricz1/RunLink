import React, { useState } from 'react';

const WorkoutForm = ({ onWorkoutCreated }) => {
  const [distance, setDistance] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = { distance, pace: { minutes, seconds } };

    try {
      const response = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWorkout),
      });
      if (!response.ok) throw new Error('Something went wrong!');
      const createdWorkout = await response.json();
      onWorkoutCreated(createdWorkout);
      setDistance('');
      setMinutes('');
      setSeconds('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Distance:</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>
      <div>
        <label>Minutes:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
      <div>
        <label>Seconds:</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
