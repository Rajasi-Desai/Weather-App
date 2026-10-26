import { useState } from "react";

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;

    setQuery(value);

    if(value.length >= 3) {
      try {
        const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";
        const encodedCityName = encodeURIComponent(value);

        const url = `${baseUrl}?name=${encodedCityName}&count=5`;

        const response = await fetch(url);

        const data = await response.json();

        if(data.results) {
          setSuggestions(data.results);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error in fetching city suggestions: ", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setQuery(city.name);
    setSuggestions([]);

    onCitySelect(city);
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <input 
        type="text" 
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city..."
        className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/20 backdrop-blue-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl border border-white/30 shadow-lg z-50 overflow-hidden">
          {suggestions.map((city, index) => (
            <li 
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="px-4 py-3 text-left text-gray-700 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;