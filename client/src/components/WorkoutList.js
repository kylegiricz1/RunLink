import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import WorkoutCard from './WorkoutCard.js'
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
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout._id}
          workout={workout}
          user={user}
          runAction={runAction}
          loadingId={loadingId}
        />
      ))}
    </ul>
  </>;
};

export default WorkoutList;
