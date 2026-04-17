// Weather condition to gradient mapping
export const WEATHER_GRADIENTS = {
  clear_day: 'linear-gradient(135deg, #f093fb 0%, #f5576c 30%, #fda085 60%, #f6d365 100%)',
  clear_night: 'linear-gradient(135deg, #0c0e2b 0%, #1a1a4e 30%, #2d2b55 60%, #1b1b3a 100%)',
  clouds: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #a8a4ce 100%)',
  rain: 'linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)',
  drizzle: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
  thunderstorm: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  snow: 'linear-gradient(135deg, #e6e9f0 0%, #c4d0e0 50%, #a8b8d0 100%)',
  mist: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
  default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

// Map weather condition codes to gradient keys
export const getWeatherGradient = (weatherId, icon) => {
  const isNight = icon?.includes('n');
  
  if (weatherId >= 200 && weatherId < 300) return WEATHER_GRADIENTS.thunderstorm;
  if (weatherId >= 300 && weatherId < 400) return WEATHER_GRADIENTS.drizzle;
  if (weatherId >= 500 && weatherId < 600) return WEATHER_GRADIENTS.rain;
  if (weatherId >= 600 && weatherId < 700) return WEATHER_GRADIENTS.snow;
  if (weatherId >= 700 && weatherId < 800) return WEATHER_GRADIENTS.mist;
  if (weatherId === 800) return isNight ? WEATHER_GRADIENTS.clear_night : WEATHER_GRADIENTS.clear_day;
  if (weatherId > 800) return WEATHER_GRADIENTS.clouds;
  
  return WEATHER_GRADIENTS.default;
};

// Auto-refresh interval (5 minutes)
export const REFRESH_INTERVAL = 5 * 60 * 1000;

// OpenWeatherMap icon URL
export const getWeatherIconUrl = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

// Day names
export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const FULL_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
