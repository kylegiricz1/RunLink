import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const addUser = async (user) => {
    try {
        console.log(user);
        const response = await axios.post(`${API_URL}/register`, user);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error("Error adding user:", error.response?.data || error.message);
        throw error;
    }
};

export const signInUser = async (user) => {
    try{    
        const response = await axios.post(`${API_URL}/login`, user)

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error("Error logging in  user:", error.response?.data || error.message);
        throw error;
    }
}

export const getProfile = async (token) => {
    try{
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;;

    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch user profile");
    }
}