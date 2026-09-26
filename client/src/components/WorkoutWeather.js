import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchWorkoutWeather } from '../services/weatherService';
import {
  FaSun,
  FaCloudSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaSmog,
  FaWind,
  FaTint,
  FaThermometerHalf,
  FaTimes,
} from 'react-icons/fa';
import '../styles/workoutWeather.css';

const renderWeatherIcon = (iconType) => {
  switch (iconType) {
    case 'sun':
      return <FaSun className="weather-icon-sun" aria-hidden="true" />;
    case 'cloud-sun':
      return <FaCloudSun className="weather-icon-cloud-sun" aria-hidden="true" />;
    case 'cloud':
      return <FaCloud className="weather-icon-cloud" aria-hidden="true" />;
    case 'rain':
      return <FaCloudRain className="weather-icon-rain" aria-hidden="true" />;
    case 'snow':
      return <FaSnowflake className="weather-icon-snow" aria-hidden="true" />;
    case 'thunderstorm':
      return <FaBolt className="weather-icon-thunder" aria-hidden="true" />;
    case 'smog':
      return <FaSmog className="weather-icon-smog" aria-hidden="true" />;
    default:
      return <FaCloudSun className="weather-icon-cloud-sun" aria-hidden="true" />;
  }
};

const WorkoutWeather = ({ coordinates, date, onOpenChange }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const updateOpenState = useCallback((newState) => {
    setIsOpen(newState);
    if (onOpenChange) {
      onOpenChange(newState);
    }
  }, [onOpenChange]);

  useEffect(() => {
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2 || !date) {
      return;
    }

    // GeoJSON point format is [longitude, latitude]
    const lng = coordinates[0];
    const lat = coordinates[1];

    let isMounted = true;
    setLoading(true);

    fetchWorkoutWeather(lat, lng, date)
      .then((data) => {
        if (isMounted) {
          setWeather(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [coordinates, date]);

  // Handle click outside and Escape key to close popover
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        updateOpenState(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        updateOpenState(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, updateOpenState]);

  if (loading) {
    return (
      <div className="workout-weather-container">
        <span className="workout-weather-badge loading">
          <span className="weather-dot-pulse"></span>
          <span className="weather-loading-text">--°F</span>
        </span>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="workout-weather-container" ref={popoverRef}>
      <button
        type="button"
        className="workout-weather-badge"
        onClick={() => updateOpenState(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Forecast: ${weather.weatherLabel}, ${weather.temperature}°F. Click for details.`}
        title="Click for weather details"
      >
        <span className="weather-badge-icon">{renderWeatherIcon(weather.iconType)}</span>
        <span className="weather-badge-temp">{weather.temperature}°F</span>
      </button>

      {isOpen && (
        <div className="workout-weather-popover" role="dialog" aria-label="Weather forecast details">
          <div className="weather-popover-header">
            <div className="weather-condition-title">
              {renderWeatherIcon(weather.iconType)}
              <div>
                <strong>{weather.weatherLabel}</strong>
                <small className="weather-temp-main">{weather.temperature}°F</small>
              </div>
            </div>
            <button
              type="button"
              className="weather-popover-close"
              onClick={() => updateOpenState(false)}
              aria-label="Close weather details"
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <div className="weather-metrics-grid">
            <div className="weather-metric-item">
              <FaThermometerHalf className="metric-icon" aria-hidden="true" />
              <div>
                <small>Feels Like</small>
                <strong>{weather.apparentTemperature}°F</strong>
              </div>
            </div>

            <div className="weather-metric-item">
              <FaTint className="metric-icon rain" aria-hidden="true" />
              <div>
                <small>Precipitation</small>
                <strong>{weather.precipitationProbability}%</strong>
              </div>
            </div>

            <div className="weather-metric-item">
              <FaWind className="metric-icon wind" aria-hidden="true" />
              <div>
                <small>Wind Speed</small>
                <strong>{weather.windSpeed} mph</strong>
              </div>
            </div>

            <div className="weather-metric-item">
              <FaCloud className="metric-icon humidity" aria-hidden="true" />
              <div>
                <small>Humidity</small>
                <strong>{weather.humidity}%</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutWeather;
