import { useState, useEffect } from "react";

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

  useEffect(() => {
    if(!selectedCity) return;

    const fetchWeatherData = async () => {
      const {latitude, longitude} = selectedCity;
      
      try {
        const baseUrl = "https://api.open-meteo.com/v1/forecast";
        const params = new URLSearchParams({
          latitude: latitude,
          longitude: longitude,
          current_weather: "true",
          daily: "temperature_2m_max,temperature_2m_min,weather_code",
          hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
          timezone: "auto",
        });

        const url = `${baseUrl}?${params.toString()}`;

        const response = await fetch(url);

        const weatherJson = await response.json();

        setData({ ...weatherJson, location: selectedCity });

        console.log(weatherJson);
      } catch (error) {
        console.error("Error in fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  
    return () => {
      //todo  
    }
  }, [selectedCity])
  

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-blue-500 to-blue-600">
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
