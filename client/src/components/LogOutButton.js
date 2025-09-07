import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/about');// Redirect to about
    dispatch(logout()); // Dispatch Redux action
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
