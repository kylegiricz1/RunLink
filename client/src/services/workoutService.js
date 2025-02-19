import axios from 'axios';

const API_URL = 'http://localhost:5000/api/workouts';

export const fetchWorkouts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteWorkout = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const addWorkout = async (workout) => {
  const response = await axios.post(API_URL, workout);
  return response.data;
};