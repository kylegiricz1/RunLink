import React from "react";
import { useSelector } from "react-redux";
import WorkoutMap from "../components/WorkoutMap";
import { FaRunning, FaMapMarkedAlt } from "react-icons/fa";
import "./WorkoutMapPage.css";

const WorkoutMapPage = () => {
  const workouts = useSelector((state) => state.workouts.workouts || []);
  const pinnedCount = workouts.filter(
    (w) => w.location?.coordinates?.length === 2
  ).length;

  return (
    <main className="map-page">
      <div className="map-overlay-header">
        <div className="map-badge">
          <FaMapMarkedAlt aria-hidden="true" />
          <span>Community Discovery</span>
        </div>
        <h1>Workout Map</h1>
        <p className="map-subtitle">Explore group runs and meeting locations</p>
        <div className="map-stats-pill">
          <FaRunning aria-hidden="true" />
          <span>
            <strong>{pinnedCount}</strong> {pinnedCount === 1 ? 'run pinned' : 'runs pinned'}
          </span>
        </div>
      </div>

      <div className="map-container">
        <WorkoutMap />
      </div>
    </main>
  );
};

export default WorkoutMapPage;