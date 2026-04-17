import { DAY_NAMES } from './constants';

/**
 * Process forecast data into hourly chart data (next 24 hours / 8 data points)
 */
export const processHourlyData = (forecastList) => {
  if (!forecastList) return [];
  
  return forecastList.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    }),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    feelsLike: Math.round(item.main.feels_like),
    icon: item.weather[0].icon,
    description: item.weather[0].description,
  }));
};

/**
 * Process forecast data into daily summaries (group by day)
 */
export const processDailyData = (forecastList) => {
  if (!forecastList) return [];
  
  const dailyMap = {};
  
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!dailyMap[dateKey]) {
      dailyMap[dateKey] = {
        date: dateKey,
        dayName: DAY_NAMES[date.getDay()],
        temps: [],
        icons: [],
        descriptions: [],
        humidity: [],
      };
    }
    
    dailyMap[dateKey].temps.push(item.main.temp);
    dailyMap[dateKey].icons.push(item.weather[0].icon);
    dailyMap[dateKey].descriptions.push(item.weather[0].description);
    dailyMap[dateKey].humidity.push(item.main.humidity);
  });
  
  return Object.values(dailyMap)
    .map((day) => ({
      date: day.date,
      dayName: day.dayName,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
      // Pick the most common icon (midday preferred)
      icon: day.icons[Math.floor(day.icons.length / 2)],
      description: day.descriptions[Math.floor(day.descriptions.length / 2)],
      avgHumidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
    }))
    .slice(0, 7);
};

/**
 * Generate smart insights based on current weather data
 */
export const generateInsights = (current) => {
  if (!current) return [];
  
  const insights = [];
  const temp = current.main.temp;
  const feelsLike = current.main.feels_like;
  const humidity = current.main.humidity;
  const windSpeed = current.wind.speed * 3.6; // Convert m/s to km/h
  const tempDiff = Math.abs(temp - feelsLike);
  
  // Temperature insights
  if (temp > 40) {
    insights.push({ icon: '🔥', text: 'Extreme heat alert! Stay hydrated and avoid sun exposure.', severity: 'danger' });
  } else if (temp > 35) {
    insights.push({ icon: '☀️', text: 'Very hot conditions. Consider staying indoors during peak hours.', severity: 'warning' });
  } else if (temp > 28) {
    insights.push({ icon: '🌤️', text: 'Warm weather — great for outdoor activities with sun protection.', severity: 'info' });
  } else if (temp < 0) {
    insights.push({ icon: '🥶', text: 'Freezing temperatures detected! Bundle up and watch for ice.', severity: 'danger' });
  } else if (temp < 10) {
    insights.push({ icon: '🧥', text: 'Cold conditions — warm clothing recommended.', severity: 'warning' });
  } else {
    insights.push({ icon: '✨', text: 'Pleasant temperature range — enjoy the weather!', severity: 'good' });
  }
  
  // Feels like insight
  if (tempDiff > 5) {
    insights.push({
      icon: '🌡️',
      text: `Feels ${feelsLike > temp ? 'warmer' : 'colder'} than actual: ${Math.round(feelsLike)}°C vs ${Math.round(temp)}°C.`,
      severity: 'warning',
    });
  }
  
  // Humidity insights
  if (humidity > 85) {
    insights.push({ icon: '💧', text: 'Very high humidity — expect muggy conditions and possible fog.', severity: 'warning' });
  } else if (humidity > 70) {
    insights.push({ icon: '💦', text: 'High humidity detected. It may feel warmer than the actual temperature.', severity: 'info' });
  } else if (humidity < 30) {
    insights.push({ icon: '🏜️', text: 'Low humidity — stay hydrated, skin may feel dry.', severity: 'info' });
  }
  
  // Wind insights
  if (windSpeed > 50) {
    insights.push({ icon: '🌪️', text: 'Dangerous wind speeds! Avoid outdoor activities.', severity: 'danger' });
  } else if (windSpeed > 30) {
    insights.push({ icon: '💨', text: 'Strong winds detected — secure loose items outdoors.', severity: 'warning' });
  } else if (windSpeed > 15) {
    insights.push({ icon: '🍃', text: 'Moderate breeze — comfortable for most activities.', severity: 'info' });
  } else {
    insights.push({ icon: '🌸', text: 'Light winds — calm and pleasant conditions.', severity: 'good' });
  }
  
  return insights;
};

/**
 * Format wind direction from degrees
 */
export const getWindDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

/**
 * Get a readable time from unix timestamp
 */
export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
