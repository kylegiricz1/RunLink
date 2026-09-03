import React from "react";
import WorkoutMap from "../components/WorkoutMap";
import "./WorkoutMapPage.css";

const WorkoutMapPage = () => {
  return (
    <div className="map-page">
      <div className="map-header">
        Workout Map
      </div>

      <div className="map-container">
        <WorkoutMap />
      </div>

      <div className="map-footer">
        © 2025 RunLink. All rights reserved.
      </div>
    </div>
  );
};

export default WorkoutMapPage;