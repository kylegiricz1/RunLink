import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = ({ onAddWorkout }) => {
  const [distance, setDistance] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/workouts', {
        distance: Number(distance),
        pace: {
          minutes: Number(minutes),
          seconds: Number(seconds)
        }
      });
      onAddWorkout(response.data);
      setDistance('');
      setMinutes('');
      setSeconds('');
    } catch (error) {
      console.error('There was an error adding the workout!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Distance: </label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Minutes: </label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Seconds: </label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
