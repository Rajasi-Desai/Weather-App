import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";

import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="contianer mx-auto px-4 py-8">
        <Header />

        <SearchBar onCitySelect={handleCitySelect} />

        {weatherData && <CurrentWeather weather={weatherData} />}

        {hourlyData.length > 0 && <HourlyForecast hourlyData={hourlyData} />}

        {forecastData.length > 0 && <Forecast forecastData={forecastData} />}

      </div>
    </div>
  );
};

export default App;
