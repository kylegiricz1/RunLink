import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllWorkouts } from '../features/workouts/workoutsSlice';

// Fix leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WorkoutMap = () => {
  const dispatch = useDispatch();
  const { workouts, status } = useSelector((state) => state.workouts);

  useEffect(() => {
    dispatch(fetchAllWorkouts());
  }, [dispatch]);

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

  if (status === 'loading') return <div className="p-4 text-center">Loading map...</div>;

  return (
    <div style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg">
      <MapContainer
        center={calculateCenter()}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />


        {workouts?.map((workout) => {
          if (workout.location && workout.location.coordinates.length === 2) {
            const [longitude, latitude] = workout.location.coordinates; // Fix: accessing correctly
            return (
              <Marker key={workout._id} position={[latitude, longitude]}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{workout.title}</h3>
                    <p className="text-sm">Type: {workout.distance}</p>
                    <p className="text-sm">Pace: {workout.pace.minutes}:{workout.pace.seconds}</p>
                    <p className="text-sm text-gray-500">
                      Participants: {workout.participants?.length || 0}
                    </p>
                  </div>
                </Tooltip>
              </Marker>
            );
          }
          return null; // Prevents errors if no valid coordinates
        })}
      </MapContainer>
    </div>
  );
};

export default WorkoutMap;
