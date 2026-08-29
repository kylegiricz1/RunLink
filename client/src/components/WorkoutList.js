import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { deleteWorkoutById, joinWorkoutById, leaveWorkoutById } from '../features/workouts/workoutsSlice';
import '../styles/workoutList.css';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const { workouts, status, error } = useSelector((state) => state.workouts);
  const user = useSelector((state) => state.auth.user);
  const [loadingId, setLoadingId] = useState(null);
  const runAction = (action, id) => { setLoadingId(id); dispatch(action(id)).finally(() => setLoadingId(null)); };

  return <>
    <div className="workout-list-heading">
      <div><p className="eyebrow">Upcoming sessions</p><h2>Runs near the community</h2></div>
      <span className="workout-count">{workouts.length} {workouts.length === 1 ? 'run' : 'runs'}</span>
    </div>
    {status === 'loading' && <p className="workout-state">Loading runs…</p>}
    {status === 'failed' && <p className="workout-state error">{error || 'Unable to load runs. Please try again.'}</p>}
    {status === 'succeeded' && workouts.length === 0 && <p className="workout-state">No upcoming runs yet. Be the first to create one.</p>}
    <ul className="workout-container">
      {workouts.map((workout) => {
        const isCreator = workout.createdBy?._id === user?.id;
        const hasJoined = workout.participants?.some((participant) => participant._id === user?.id);
        return <li key={workout._id}>
          <div className="workout-header"><p className="workout-date">{new Date(workout.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p><h3>{workout.createdBy?.name || 'Community'} run</h3></div>
          <div className="workout-info"><span><strong>{workout.distance} km</strong><small>distance</small></span><span><strong>{workout.pace?.minutes}:{String(workout.pace?.seconds || 0).padStart(2, '0')}</strong><small>min / km</small></span><span><strong>{workout.participants?.length || 0}</strong><small>joined</small></span></div>
          {workout.description && <p className="workout-description">{workout.description}</p>}
          {isCreator && <button className="delete-button" onClick={() => runAction(deleteWorkoutById, workout._id)} disabled={loadingId === workout._id} aria-label="Delete this run"><FaTrash /></button>}
          {user && !isCreator && !hasJoined && <button className="join-button" onClick={() => runAction(joinWorkoutById, workout._id)} disabled={loadingId === workout._id}>{loadingId === workout._id ? 'Joining…' : 'Join run'}</button>}
          {user && hasJoined && <button className="join-button" onClick={() => runAction(leaveWorkoutById, workout._id)} disabled={loadingId === workout._id}>{loadingId === workout._id ? 'Leaving…' : 'Leave run'}</button>}
        </li>;
      })}
    </ul>
  </>;
};

export default WorkoutList;
