import {weatherCodes} from "../data/weatherCodes";

const WeatherForecast = ({ forecast }) => {
  if (!forecast || !forecast.daily) return null;

  const forecastItems = forecast.daily.time.slice(0, 7).map((date, index) => {
    const weatherInfo =
      weatherCodes[forecast.daily.weather_code[index]] || {
        description: "Unknown",
        icon: "❓",
      };

    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    return (
      <div key={index} className="forecast-card p-4 text-center rounded-lg bg-white ">
        <div className="font-medium text-gray-800 mb-2 text-sm">
          {index === 0 ? "Today" : dayName}
        </div>
        <div className="text-2xl mb-2">{weatherInfo.icon}</div>
        <div className="text-xs text-gray-600 mb-2">
          {Math.round(forecast.daily.temperature_2m_max[index])}°
        </div>
        <div className="text-xs text-gray-500">
          {Math.round(forecast.daily.temperature_2m_min[index])}°
        </div>
      </div>
    );
  });

  return (
    <div className="weather-card p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        📅 7-Day Forecast
      </h3>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {forecastItems}
      </div>
    </div>
  );
};

export default WeatherForecast;
