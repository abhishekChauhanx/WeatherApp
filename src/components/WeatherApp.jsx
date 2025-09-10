import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather"
import WeatherForecast from "./WeatherForecast";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather data by coordinates
  const fetchWeatherData = async (lat, lon, locationName = "") => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      if (!response.ok) {
        throw new Error("Weather data not available");
      }

      const data = await response.json();
      setCurrentWeather(data.current);
      setForecast(data);
      setLocation(locationName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`);
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search for city coordinates
  const searchCity = async (cityName) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          cityName
        )}`
      );

      if (!response.ok) {
        throw new Error("Geocoding service not available");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const city = data.results[0];
        const cityLocation = `${city.name}, ${city.country}`;
        await fetchWeatherData(
          city.latitude,
          city.longitude,
          cityLocation
        );
      } else {
        setError("City not found. Please try a different search term.");
        setLoading(false);
      }
    } catch (err) {
      setError("Unable to search for location. Please try again.");
      setLoading(false);
      console.error("Search error:", err);
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError("");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(
            position.coords.latitude,
            position.coords.longitude,
            "Your Location"
          );
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(
            "Unable to access your location. Please search for a city instead."
          );
          setLoading(false);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Load user's location on app start
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
            🌤️ Weather App
          </h1>
          <p className="text-white/80 text-lg">
            Get real-time weather updates for any location
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={searchCity} loading={loading} />

        {/* Location Button */}
        <div className="text-center mb-6">
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              loading
                ? "bg-white/50 text-gray-500 cursor-not-allowed"
                : "bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg"
            }`}
          >
            📍 Use Current Location
          </button>
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Weather Content */}
        {!loading && !error && currentWeather && (
          <div className="space-y-6">
            <CurrentWeather weather={currentWeather} location={location} />
            <WeatherForecast forecast={forecast} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>
            Made by Abhishek Chauhan • Built with ReactJs & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
