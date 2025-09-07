import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkoutById, joinWorkoutById, leaveWorkoutById } from '../features/workouts/workoutsSlice';

import { FaTrash } from "react-icons/fa";
import '../styles/workoutList.css';
import './joinButton.css';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts.workouts);
  const user = useSelector((state) => state.auth.user);

  const [loadingId, setLoadingId] = useState(null);

  const handleDeleteWorkout = (id) => {
    dispatch(deleteWorkoutById(id));
  };

  const handleJoinWorkout = (id) => {
    setLoadingId(id); 
    dispatch(joinWorkoutById(id))
      .finally(() => setLoadingId(null));
  };

  const handleLeaveWorkout = (id) => {
    setLoadingId(id);
    dispatch(leaveWorkoutById(id))
      .finally(() => setLoadingId(null));
  };

  return (
    <>
      <h2>Workouts</h2>
      <ul className='workout-container'>
        {workouts.map((workout) => (
          <React.Fragment key={workout._id}>
            <li>
              <div className="workout-header">
                <h3>{`${workout.createdBy.name}'s Workout!`}</h3>
              </div>
              <div className="workout-info">
                <span><strong>LNG:</strong> {workout.location.coordinates[0]}</span>
                <span><strong>LAT:</strong> {workout.location.coordinates[1]}</span>
                <span><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</span>
                <span><strong>Distance:</strong> {workout.distance} km</span>
                <span><strong>Pace:</strong> {workout.pace.minutes} min {workout.pace.seconds} sec</span>
                <span><strong>Description:</strong> {workout.description}</span>
                <span><strong>Group Size:</strong> {workout.participants.length}</span>
              </div>
              
              {user && workout.createdBy?._id === user.id && (
                <>
                  <button className='delete-button' onClick={() => handleDeleteWorkout(workout._id)}><FaTrash/></button>
                </>
              )}

              {user && workout.createdBy?._id !== user.id && 
                !workout.participants.some(participant => participant._id === user.id) && (
                  <button
                    className="join-button"
                    onClick={() => handleJoinWorkout(workout._id)}
                    disabled={loadingId === workout._id}
                  >
                    {loadingId === workout._id ? 'Joining...' : 'Join Workout'}
                  </button>
                )}

              {user && workout.participants.some(participant => participant._id === user.id) && (
                <button
                  onClick={() => handleLeaveWorkout(workout._id)}
                  className="join-button"
                  disabled={loadingId === workout._id}
                >
                  {loadingId === workout._id ? 'Leaving...' : 'Leave'}
                </button>
              )}
            </li>
          </React.Fragment>
          
        ))}
      </ul>
    </>
  );
};

export default WorkoutList;
