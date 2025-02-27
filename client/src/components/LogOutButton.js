import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch Redux action
    navigate('/about'); // Redirect to about
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
