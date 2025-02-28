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
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found, user is not authenticated');
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  };
  const response = await axios.post(API_URL, workout, config);
  return response.data;
};

export const joinWorkout = async(workoutId, token) => {
  const tokens = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${tokens}`,
    },
  };
  const response = await axios.post(`${API_URL}/${workoutId}/join`, {}, config);
  return response.data;
};

export const leaveWorkout = async(workoutId, token) => {
  const tokens = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${tokens}`,
    },
  };
  const response = await axios.post(`${API_URL}/${workoutId}/leave`, {}, config);
  return response.data;
}