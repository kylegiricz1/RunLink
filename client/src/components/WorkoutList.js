import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes, FaRunning } from 'react-icons/fa';
import WorkoutCard from './WorkoutCard.js';
import '../styles/workoutList.css';

const DISTANCE_FILTERS = [
  { id: 'all', label: 'All distances' },
  { id: 'under5', label: '< 5 km' },
  { id: '5to10', label: '5 – 10 km' },
  { id: 'over10', label: '10+ km' },
];

const WorkoutList = () => {
  const dispatch = useDispatch();
  const { workouts, status, error } = useSelector((state) => state.workouts);
  const user = useSelector((state) => state.auth.user);
  const [loadingId, setLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('all');

  const runAction = (action, id) => {
    setLoadingId(id);
    dispatch(action(id)).finally(() => setLoadingId(null));
  };

  const isFiltered = searchTerm.trim() !== '' || distanceFilter !== 'all';

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      // Distance filter
      const dist = Number(workout.distance) || 0;
      if (distanceFilter === 'under5' && dist >= 5) return false;
      if (distanceFilter === '5to10' && (dist < 5 || dist > 10)) return false;
      if (distanceFilter === 'over10' && dist <= 10) return false;

      // Keyword search (title, organizer, description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const title = (workout.title || '').toLowerCase();
        const organizer = (workout.createdBy?.name || '').toLowerCase();
        const desc = (workout.description || '').toLowerCase();
        const matches = title.includes(query) || organizer.includes(query) || desc.includes(query);
        if (!matches) return false;
      }

      return true;
    });
  }, [workouts, distanceFilter, searchTerm]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setDistanceFilter('all');
  };

  return (
    <>
      <div className="workout-list-heading">
        <div>
          <p className="eyebrow">Upcoming sessions</p>
          <h2>Runs near the community</h2>
        </div>
        <span className="workout-count">
          {isFiltered
            ? `Showing ${filteredWorkouts.length} of ${workouts.length} runs`
            : `${workouts.length} ${workouts.length === 1 ? 'run' : 'runs'}`}
        </span>
      </div>

      {workouts.length > 0 && (
        <div className="workout-filter-bar" role="search" aria-label="Filter upcoming runs">
          <div className="filter-search-wrapper">
            <input
              type="text"
              className="filter-search-input"
              placeholder="Search by title, runner, or keyword…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search runs"
            />
            {searchTerm && (
              <button
                type="button"
                className="filter-search-clear"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <FaTimes aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="filter-chips-group" role="group" aria-label="Filter runs by distance">
            {DISTANCE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`filter-chip ${distanceFilter === filter.id ? 'filter-chip--active' : ''}`}
                onClick={() => setDistanceFilter(filter.id)}
                aria-pressed={distanceFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === 'loading' && <p className="workout-state">Loading runs…</p>}
      {status === 'failed' && <p className="workout-state error">{error || 'Unable to load runs. Please try again.'}</p>}
      {status === 'succeeded' && workouts.length === 0 && (
        <p className="workout-state">No upcoming runs yet. Be the first to create one.</p>
      )}

      {workouts.length > 0 && filteredWorkouts.length === 0 && (
        <div className="filter-empty-state">
          <div className="filter-empty-icon" aria-hidden="true">
            <FaRunning />
          </div>
          <h3>No matching runs found</h3>
          <p>We couldn't find any runs matching "{searchTerm}" for the selected distance.</p>
          <button type="button" className="filter-reset-btn" onClick={handleResetFilters}>
            Reset filters
          </button>
        </div>
      )}

      <ul className="workout-container">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            user={user}
            runAction={runAction}
            loadingId={loadingId}
          />
        ))}
      </ul>
    </>
  );
};

export default WorkoutList;
