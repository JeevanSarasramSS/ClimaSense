const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city, apiKey) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
    if (response.status === 404) throw new Error(`City "${city}" not found. Please try another city name.`);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
  
  return response.json();
};

export const fetchForecast = async (city, apiKey) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  );
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Invalid API key.');
    if (response.status === 404) throw new Error(`City "${city}" not found.`);
    throw new Error('Failed to fetch forecast data.');
  }
  
  return response.json();
};
