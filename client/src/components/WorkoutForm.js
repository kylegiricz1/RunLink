import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWorkout } from '../features/workouts/workoutsSlice';
import MapComponent from './MapComponent';

import '../styles/styles.css';

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    location: [],
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

  const handleLocationSelect = (location) => {
    setFormData((prev) => ({
      ...prev,
      location,
    }),
  );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createWorkout(formData));
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
          <MapComponent onLocationSelect={handleLocationSelect} />
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
