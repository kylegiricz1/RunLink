import React from 'react';
import { FaTrash } from 'react-icons/fa';

import {
  deleteWorkoutById,
  joinWorkoutById,
  leaveWorkoutById,
} from '../features/workouts/workoutsSlice';

const WorkoutCard = ({ workout, user, runAction, loadingId }) => {
  const isCreator =
    workout.createdBy?._id?.toString() === user?.id?.toString();

  const hasJoined = workout.participants?.some(
    (participant) =>
      participant._id?.toString() === user?.id?.toString()
  );

  const isLoading = loadingId === workout._id;

  return (
    <li>
      <div className="workout-header">
        <p className="workout-date">
          {new Date(workout.date).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </p>

        <h3>{workout.createdBy?.name || 'Community'} run</h3>
      </div>

      <div className="workout-info">
        <span>
          <strong>{workout.distance} km</strong>
          <small>distance</small>
        </span>

        <span>
          <strong>
            {workout.pace?.minutes}:
            {String(workout.pace?.seconds || 0).padStart(2, '0')}
          </strong>
          <small>min / km</small>
        </span>

        <span>
          <strong>{workout.participants?.length || 0}</strong>
          <small>joined</small>
        </span>
      </div>

      {workout.description && (
        <p className="workout-description">
          {workout.description}
        </p>
      )}

      {isCreator && (
        <button
          className="delete-button"
          onClick={() => runAction(deleteWorkoutById, workout._id)}
          disabled={isLoading}
          aria-label="Delete this run"
        >
          <FaTrash />
        </button>
      )}

      {user && !isCreator && !hasJoined && (
        <button
          className="join-button"
          onClick={() => runAction(joinWorkoutById, workout._id)}
          disabled={isLoading}
        >
          {isLoading ? 'Joining…' : 'Join run'}
        </button>
      )}

      {user && hasJoined && (
        <button
          className="join-button"
          onClick={() => runAction(leaveWorkoutById, workout._id)}
          disabled={isLoading}
        >
          {isLoading ? 'Leaving…' : 'Leave run'}
        </button>
      )}
    </li>
  );
};

export default WorkoutCard;