import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllWorkouts, fetchWorkoutById } from '../features/workouts/workoutsSlice';
import { FaCalendarAlt, FaRunning, FaStopwatch, FaUserFriends } from 'react-icons/fa';

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WorkoutMap = ({ workoutId }) => {
  const dispatch = useDispatch();
  const { workouts, status } = useSelector((state) => state.workouts);

  useEffect(() => {
    if (workoutId) {
      dispatch(fetchWorkoutById(workoutId));
    } else {
      dispatch(fetchAllWorkouts());
    }
  }, [dispatch, workoutId]);

  // Calculate average position for initial map center
  const calculateCenter = () => {
    if (!workouts || workouts.length === 0) return [51.505, -0.09];

    const validWorkouts = workouts.filter(
      (workout) => workout.location && workout.location.coordinates.length === 2
    );

    if (validWorkouts.length === 0) return [51.505, -0.09];

    const lat =
      validWorkouts.reduce((sum, w) => sum + w.location.coordinates[1], 0) /
      validWorkouts.length;
    const lng =
      validWorkouts.reduce((sum, w) => sum + w.location.coordinates[0], 0) /
      validWorkouts.length;

    return [lat, lng]; // Leaflet uses [lat, lng]
  };

  const workoutsToDisplay = workoutId
    ? workouts.filter((w) => w._id === workoutId)
    : workouts;

  if (status === 'loading') {
    return (
      <div className="map-loading-wrapper">
        <div className="map-loading-spinner" />
        <p>Loading community map…</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer
        center={calculateCenter()}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={!workoutId}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {workoutsToDisplay?.map((workout) => {
          if (workout.location && workout.location.coordinates.length === 2) {
            const [longitude, latitude] = workout.location.coordinates;
            const dateObj = new Date(workout.date);
            const formattedDate = dateObj.toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            });
            const organizer = workout.createdBy?.name || 'Community';
            const title = workout.title || `${organizer}'s Run`;
            const paceMinutes = workout.pace?.minutes ?? 0;
            const paceSeconds = String(workout.pace?.seconds || 0).padStart(2, '0');

            return (
              <Marker key={workout._id} position={[latitude, longitude]}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div className="map-pin-tooltip">
                    <div className="pin-tooltip-header">
                      <span className="pin-tooltip-badge">Group Run</span>
                      <h4 className="pin-tooltip-title">{title}</h4>
                    </div>

                    <div className="pin-tooltip-date">
                      <FaCalendarAlt aria-hidden="true" />
                      <span>{formattedDate}</span>
                    </div>

                    <div className="pin-tooltip-grid">
                      <div className="pin-metric">
                        <FaRunning aria-hidden="true" />
                        <div>
                          <small>Distance</small>
                          <strong>{workout.distance} km</strong>
                        </div>
                      </div>

                      <div className="pin-metric">
                        <FaStopwatch aria-hidden="true" />
                        <div>
                          <small>Pace</small>
                          <strong>{paceMinutes}:{paceSeconds}</strong>
                        </div>
                      </div>

                      <div className="pin-metric">
                        <FaUserFriends aria-hidden="true" />
                        <div>
                          <small>Runners</small>
                          <strong>{workout.participants?.length || 0}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default WorkoutMap;
