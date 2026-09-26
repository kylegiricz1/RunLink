// Cache key: lat,lng_YYYY-MM-DD-HH -> weatherData
const weatherCache = new Map();

/**
 * Maps WMO Weather Interpretation Codes (0-99) to clean labels and icon types.
 */
export const getWeatherDetails = (wmoCode) => {
  switch (wmoCode) {
    case 0:
      return { label: 'Clear Sky', iconType: 'sun' };
    case 1:
      return { label: 'Mainly Clear', iconType: 'cloud-sun' };
    case 2:
      return { label: 'Partly Cloudy', iconType: 'cloud-sun' };
    case 3:
      return { label: 'Overcast', iconType: 'cloud' };
    case 45:
    case 48:
      return { label: 'Foggy', iconType: 'smog' };
    case 51:
    case 53:
    case 55:
      return { label: 'Light Drizzle', iconType: 'rain' };
    case 56:
    case 57:
      return { label: 'Freezing Drizzle', iconType: 'snow' };
    case 61:
    case 63:
    case 65:
      return { label: 'Rain', iconType: 'rain' };
    case 66:
    case 67:
      return { label: 'Freezing Rain', iconType: 'snow' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { label: 'Snow', iconType: 'snow' };
    case 80:
    case 81:
    case 82:
      return { label: 'Rain Showers', iconType: 'rain' };
    case 85:
    case 86:
      return { label: 'Snow Showers', iconType: 'snow' };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', iconType: 'thunderstorm' };
    default:
      return { label: 'Cloudy', iconType: 'cloud' };
  }
};

/**
 * Generates tailored advice for runners based on temperature, rain, wind, and conditions.
 */
export const getRunningTip = (tempF, precipProb, windSpeedMph, wmoCode) => {
  if (wmoCode >= 95) {
    return '⚡ Lightning/Thunderstorm risk: Consider rescheduling or running indoors.';
  }
  if (precipProb >= 60 || (wmoCode >= 61 && wmoCode <= 82)) {
    return '🌧️ Rain expected: Wear a brimmed hat and water-resistant gear.';
  }
  if (tempF >= 85) {
    return '🔥 Hot conditions: Hydrate early, run in shade, and reduce target pace.';
  }
  if (tempF >= 75) {
    return '☀️ Warm weather: Bring water and wear lightweight breathable apparel.';
  }
  if (tempF <= 32) {
    return '❄️ Freezing temperatures: Watch for icy patches and wear thermal layers & gloves.';
  }
  if (tempF <= 45) {
    return '🧤 Chilly run: Great running weather once warmed up! Light layers recommended.';
  }
  if (windSpeedMph >= 18) {
    return '💨 High winds: Be prepared for resistance and start into the wind.';
  }
  return '🏃 Ideal running conditions! Have a great workout.';
};

/**
 * Fetches hourly forecast from Open-Meteo matching the workout's coordinates and scheduled time.
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string|Date} workoutDate - The workout date/time
 */
export const fetchWorkoutWeather = async (lat, lng, workoutDate) => {
  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return null;
  }

  const dateObj = new Date(workoutDate);
  if (isNaN(dateObj.getTime())) {
    return null;
  }

  // Round coordinates to 2 decimal places (~1.1 km precision) for caching
  const roundedLat = lat.toFixed(2);
  const roundedLng = lng.toFixed(2);
  const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getHours()).padStart(2, '0')}`;
  const cacheKey = `${roundedLat},${roundedLng}_${dateKey}`;

  if (weatherCache.has(cacheKey)) {
    return weatherCache.get(cacheKey);
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m,relativehumidity_2m&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather service error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.hourly || !Array.isArray(data.hourly.time) || data.hourly.time.length === 0) {
      return null;
    }

    // Find the hourly index closest to the target workout time
    const workoutEpoch = dateObj.getTime();
    let bestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < data.hourly.time.length; i++) {
      const forecastEpoch = new Date(data.hourly.time[i]).getTime();
      const diff = Math.abs(forecastEpoch - workoutEpoch);
      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = i;
      }
    }

    const h = data.hourly;
    const temp = Math.round(h.temperature_2m[bestIndex]);
    const apparentTemp = Math.round(h.apparent_temperature[bestIndex]);
    const precipProb = h.precipitation_probability ? Math.round(h.precipitation_probability[bestIndex] || 0) : 0;
    const code = h.weathercode ? h.weathercode[bestIndex] : 0;
    const wind = h.windspeed_10m ? Math.round(h.windspeed_10m[bestIndex]) : 0;
    const humidity = h.relativehumidity_2m ? Math.round(h.relativehumidity_2m[bestIndex]) : 0;

    const { label, iconType } = getWeatherDetails(code);
    const tip = getRunningTip(temp, precipProb, wind, code);

    const result = {
      temperature: temp,
      apparentTemperature: apparentTemp,
      precipitationProbability: precipProb,
      weatherCode: code,
      weatherLabel: label,
      iconType,
      windSpeed: wind,
      humidity,
      tip,
      forecastTime: h.time[bestIndex],
    };

    weatherCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn('Unable to load workout weather:', err.message);
    return null;
  }
};
