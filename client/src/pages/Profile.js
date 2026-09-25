import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProfile } from '../features/auth/authSlice';
import { fetchAllWorkouts } from '../features/workouts/workoutsSlice';
import LogoutButton from '../components/LogOutButton';
import {
  FaRunning,
  FaUserFriends,
  FaRoute,
  FaLink,
  FaCompass,
  FaEnvelope,
  FaCalendarAlt,
  FaPlusCircle,
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const { workouts, status: workoutsStatus } = useSelector((state) => state.workouts);

  const [activeTab, setActiveTab] = useState('organized'); // 'organized' | 'joined'

  useEffect(() => {
    dispatch(fetchUserProfile());
    if (workoutsStatus === 'idle') {
      dispatch(fetchAllWorkouts());
    }
  }, [dispatch, workoutsStatus]);

  const userId = user?._id || user?.id;

  const organizedRuns = useMemo(() => {
    if (!userId || !workouts) return [];
    return workouts.filter((w) => {
      const creatorId = w.createdBy?._id || w.createdBy;
      return creatorId?.toString() === userId.toString();
    });
  }, [workouts, userId]);

  const joinedRuns = useMemo(() => {
    if (!userId || !workouts) return [];
    return workouts.filter((w) => {
      return w.participants?.some((p) => {
        const participantId = p?._id || p;
        return participantId?.toString() === userId.toString();
      });
    });
  }, [workouts, userId]);

  const totalDistance = useMemo(() => {
    const orgDist = organizedRuns.reduce((sum, w) => sum + (Number(w.distance) || 0), 0);
    const joinedDist = joinedRuns.reduce((sum, w) => sum + (Number(w.distance) || 0), 0);
    return (orgDist + joinedDist).toFixed(1);
  }, [organizedRuns, joinedRuns]);

  if (authLoading && !user) {
    return (
      <main className="profile-page">
        <div className="profile-loading">Loading runner profile…</div>
      </main>
    );
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'R';

  return (
    <main className="profile-page">
      {/* Profile Header Hero */}
      <section className="profile-hero-card">
        <div className="profile-identity">
          <div className="profile-avatar-circle" aria-hidden="true">
            {userInitial}
          </div>
          <div className="profile-user-meta">
            <span className="profile-badge">RunLink Runner</span>
            <h1>{user?.name || 'Runner'}</h1>
            <p className="profile-email">
              <FaEnvelope aria-hidden="true" /> {user?.email}
            </p>
          </div>
        </div>

        <div className="profile-controls">
          <Link to="/" className="btn-browse-runs">
            <FaCompass aria-hidden="true" /> Browse Runs
          </Link>
          <div className="profile-logout-wrapper">
            <LogoutButton />
          </div>
        </div>
      </section>

      {/* Runner Statistics Overview */}
      <section className="profile-stats-grid" aria-label="Runner stats">
        <div className="profile-stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#eaf4ec', color: '#24733f' }}>
            <FaRunning aria-hidden="true" />
          </div>
          <div className="stat-meta">
            <span className="stat-value">{organizedRuns.length}</span>
            <span className="stat-label">Runs Organized</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#eaf1f8', color: '#1c5b96' }}>
            <FaUserFriends aria-hidden="true" />
          </div>
          <div className="stat-meta">
            <span className="stat-value">{joinedRuns.length}</span>
            <span className="stat-label">Runs Joined</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#fcf3e6', color: '#a3630f' }}>
            <FaRoute aria-hidden="true" />
          </div>
          <div className="stat-meta">
            <span className="stat-value">{totalDistance} km</span>
            <span className="stat-label">Total Distance</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#f5ebf7', color: '#7e2d8a' }}>
            <FaLink aria-hidden="true" />
          </div>
          <div className="stat-meta">
            <span className="stat-value">{user?.totalLinks || 0}</span>
            <span className="stat-label">Community Links</span>
          </div>
        </div>
      </section>

      {/* Activity Tabs */}
      <section className="profile-activity-section" aria-label="Run activity">
        <div className="activity-tabs-header">
          <div className="tabs-nav" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'organized'}
              className={`tab-btn ${activeTab === 'organized' ? 'active' : ''}`}
              onClick={() => setActiveTab('organized')}
            >
              Organized Runs ({organizedRuns.length})
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'joined'}
              className={`tab-btn ${activeTab === 'joined' ? 'active' : ''}`}
              onClick={() => setActiveTab('joined')}
            >
              Joined Runs ({joinedRuns.length})
            </button>
          </div>
        </div>

        {/* Tab Content: Organized */}
        {activeTab === 'organized' && (
          <div className="tab-panel">
            {organizedRuns.length > 0 ? (
              <div className="profile-runs-grid">
                {organizedRuns.map((workout) => {
                  const dateObj = new Date(workout.date);
                  const formattedDate = dateObj.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  const paceSeconds = String(workout.pace?.seconds || 0).padStart(2, '0');

                  return (
                    <article className="profile-run-card" key={workout._id}>
                      <div className="run-card-top">
                        <span className="run-card-date">
                          <FaCalendarAlt aria-hidden="true" /> {formattedDate}
                        </span>
                        <span className="run-role-tag organizer">Organizer</span>
                      </div>

                      <div className="run-card-metrics">
                        <div className="metric-box">
                          <strong>{workout.distance} km</strong>
                          <small>Distance</small>
                        </div>
                        <div className="metric-box">
                          <strong>{workout.pace?.minutes}:{paceSeconds}</strong>
                          <small>Pace (min/km)</small>
                        </div>
                        <div className="metric-box">
                          <strong>{workout.participants?.length || 0}</strong>
                          <small>Runners</small>
                        </div>
                      </div>

                      {workout.description && (
                        <p className="run-card-description">{workout.description}</p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="profile-empty-state">
                <FaRunning className="empty-icon" aria-hidden="true" />
                <h3>No Organized Runs Yet</h3>
                <p>Create a group run from the dashboard and invite local runners to join you!</p>
                <Link to="/" className="btn-primary-action">
                  <FaPlusCircle aria-hidden="true" /> Create a Run
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Joined */}
        {activeTab === 'joined' && (
          <div className="tab-panel">
            {joinedRuns.length > 0 ? (
              <div className="profile-runs-grid">
                {joinedRuns.map((workout) => {
                  const dateObj = new Date(workout.date);
                  const formattedDate = dateObj.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                  const paceSeconds = String(workout.pace?.seconds || 0).padStart(2, '0');
                  const organizerName = workout.createdBy?.name || 'Community';

                  return (
                    <article className="profile-run-card" key={workout._id}>
                      <div className="run-card-top">
                        <span className="run-card-date">
                          <FaCalendarAlt aria-hidden="true" /> {formattedDate}
                        </span>
                        <span className="run-role-tag participant">Joined</span>
                      </div>

                      <h4 className="run-card-title">{organizerName}'s Run</h4>

                      <div className="run-card-metrics">
                        <div className="metric-box">
                          <strong>{workout.distance} km</strong>
                          <small>Distance</small>
                        </div>
                        <div className="metric-box">
                          <strong>{workout.pace?.minutes}:{paceSeconds}</strong>
                          <small>Pace (min/km)</small>
                        </div>
                        <div className="metric-box">
                          <strong>{workout.participants?.length || 0}</strong>
                          <small>Runners</small>
                        </div>
                      </div>

                      {workout.description && (
                        <p className="run-card-description">{workout.description}</p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="profile-empty-state">
                <FaCompass className="empty-icon" aria-hidden="true" />
                <h3>No Joined Runs Yet</h3>
                <p>Discover upcoming runs happening in your area and join fellow runners.</p>
                <Link to="/" className="btn-primary-action">
                  <FaCompass aria-hidden="true" /> Discover Runs
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
