import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = ({ onAddWorkout }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/workouts', {
        location,
        date,
        distance: Number(distance),
        pace: {
          minutes: Number(minutes),
          seconds: Number(seconds)
        },
        description
      });
      onAddWorkout(response.data);
      setLocation('');
      setDate('');
      setDistance('');
      setMinutes('');
      setSeconds('');
      setDescription('');
    } catch (error) {
      console.error('There was an error adding the workout!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Location:</label>
        <input 
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
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
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
