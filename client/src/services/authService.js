import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const addUser = async (user) => {
    console.log(user);
  const response = await axios.post(API_URL, user);
  return response.data;
};
