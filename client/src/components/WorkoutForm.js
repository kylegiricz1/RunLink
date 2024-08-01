// src/components/WorkoutForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWorkout } from '../features/workouts/workoutsSlice';

import '../styles/styles.css'

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    distance: '',
    pace: { minutes: '', seconds: '' },
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      pace: {
        ...prev.pace,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the createWorkout action with formData
    dispatch(createWorkout({ ...formData, pace: { ...formData.pace } }));
    // Clear the form
    setFormData({
      location: '',
      date: '',
      distance: '',
      pace: { minutes: '', seconds: '' },
      description: '',
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Distance (km):
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Pace (minutes):
          <input
            type="number"
            name="minutes"
            value={formData.pace.minutes}
            onChange={handlePaceChange}
            required
          />
        </label>
        <label>
          Pace (seconds):
          <input
            type="number"
            name="seconds"
            value={formData.pace.seconds}
            onChange={handlePaceChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
