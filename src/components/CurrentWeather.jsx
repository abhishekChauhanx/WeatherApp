import {weatherCodes} from "../data/weatherCodes"

const CurrentWeather = ({ weather, location }) => {
  if (!weather) return null;

  const weatherInfo = weatherCodes[weather.weather_code] || {
    description: "Unknown",
    icon: "❓",
  };

  return (
    <div className="weather-card p-6 mb-6 animate-slide-up ">
      <div className="text-center mb-4 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📍 {location || "Current Location"}
        </h2>
        <p className="text-gray-600 text-sm">
          {new Date(weather.time).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="text-center mb-6 ">
        <div className="weather-icon text-6xl mb-2">{weatherInfo.icon}</div>
        <div className="temperature-text text-5xl mb-2">
          {Math.round(weather.temperature_2m)}°C
        </div>
        <p className="text-gray-700 font-medium text-lg capitalize">
          {weatherInfo.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="text-center p-3 glassmorphism bg-white rounded-lg">
          <div className="text-2xl mb-1">💧</div>
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="font-semibold text-gray-800">
            {weather.relative_humidity_2m}%
          </div>
        </div>

        <div className="text-center p-3 glassmorphism bg-white rounded-lg">
          <div className="text-2xl mb-1">💨</div>
          <div className="text-sm text-gray-600">Wind Speed</div>
          <div className="font-semibold text-gray-800">
            {Math.round(weather.wind_speed_10m)} km/h
          </div>
        </div>

        <div className="text-center p-3 glassmorphism bg-white rounded-lg col-span-2 sm:col-span-1">
          <div className="text-2xl mb-1">🌡️</div>
          <div className="text-sm text-gray-600">Feels Like</div>
          <div className="font-semibold text-gray-800">
            {Math.round(weather.temperature_2m)}°C
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
