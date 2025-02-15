import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { fetchAllWorkouts } from '../features/workouts/workoutsSlice';
import './DashBoard.css'; // Import the CSS file

const DashBoard = () => {
  const dispatch = useDispatch();
  const workoutsStatus = useSelector((state) => state.workouts.status);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (workoutsStatus === 'idle') {
      dispatch(fetchAllWorkouts());
    }
  }, [workoutsStatus, dispatch]);

  return (
    <div className="dashboard-container">
      {/* Workout List on the left */}
      <div className="workout-list">
        <h1 className="text-2xl font-bold mb-4">RunLink</h1>
        <WorkoutList />
      </div>

      {/* Main content area */}
      <div className="main-content">
        <button 
          className="toggle-button" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Workout"}
        </button>

        {showForm && (
          <div className="workout-form">
            <WorkoutForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

