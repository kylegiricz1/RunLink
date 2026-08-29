import axios from 'axios';

const API_URL = 'http://localhost:5000/api/workouts';

export const fetchWorkouts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Please sign in to manage a workout');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const deleteWorkout = async (id) => {
  await axios.delete(`${API_URL}/${id}`, getAuthConfig());
};

export const addWorkout = async (workout) => {
  const response = await axios.post(API_URL, workout, getAuthConfig());
  return response.data;
};

export const joinWorkout = async(workoutId) => {
  const response = await axios.post(`${API_URL}/${workoutId}/join`, {}, getAuthConfig());
  return response.data;
};

export const leaveWorkout = async(workoutId) => {
  const response = await axios.post(`${API_URL}/${workoutId}/leave`, {}, getAuthConfig());

  return response.data;

}
