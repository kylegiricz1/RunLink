// src/components/WorkoutList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkoutById, joinWorkoutById, leaveWorkoutById} from '../features/workouts/workoutsSlice';

import '../styles/styles.css';
import './joinButton.css';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts.workouts);
  const user = useSelector((state) => state.auth.user);
  
  const handleDeleteWorkout = (id) => {
    dispatch(deleteWorkoutById(id));
  };

  const handleJoinWorkout = (id) => {
    dispatch(joinWorkoutById(id));
  }

  const handleLeaveWorkout = (id) => {
    dispatch(leaveWorkoutById(id));
  }

  return (

    <>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <React.Fragment key={workout._id}>
            
            <li>
              <h3>{`${workout.createdBy.name}'s Workout!`}</h3>
              Location: LNG: {workout.location.coordinates[0]}, LAT: {workout.location.coordinates[1]},  Date: {new Date(workout.date).toLocaleDateString()}, Distance: {workout.distance} km, Pace: {workout.pace.minutes} min {workout.pace.seconds} sec,
              Description: {workout.description}, Group Size: {workout.participants.length},
              
              {user && workout.createdBy?._id === user.id && (
                <>
                  <button onClick={() => handleDeleteWorkout(workout._id)}>Delete Workout</button>
                </>
              )}

              {user && workout.createdBy?._id !== user.id && 
                !workout.participants.some(participant => participant._id === user.id) &&(
                <>
                  <button className="join-button" onClick={() => handleJoinWorkout(workout._id)}>Join Workout</button>
                </>
              )}

              {user && workout.participants.some(participant => participant._id === user.id) &&(
                <>
                  <button onClick={() => handleLeaveWorkout(workout._id)} className="join-button">Leave</button>
                </>
              )}

            </li>
            
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default WorkoutList;
