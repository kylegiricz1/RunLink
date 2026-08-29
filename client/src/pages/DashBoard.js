import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import { fetchAllWorkouts } from '../features/workouts/workoutsSlice';
import { Link } from 'react-router-dom';
import './DashBoard.css';

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
    <main className="dashboard-container">
      <section className="dashboard-heading" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">Run together</p>
          <h1 id="dashboard-title">Find your next group run</h1>
          <p>Browse upcoming sessions, join a crew, or organize a run of your own.</p>
        </div>
        <Link className="map-link" to="/workoutMap">Explore the map</Link>
      </section>
      <section className="dashboard-actions" aria-label="Create a workout">
        <button 
          className="toggle-button" 
          onClick={() => setShowForm((visible) => !visible)}
          aria-expanded={showForm}
        >
          {showForm ? "Cancel" : "Create a run"}
        </button>

        {showForm && (
          <div className="workout-form">
            <WorkoutForm />
          </div>
        )}
      </section>
      <section className="workout-list" aria-label="Upcoming workouts"><WorkoutList /></section>
    </main>
  );
};

export default DashBoard;

