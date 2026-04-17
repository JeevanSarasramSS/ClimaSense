import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../utils/api';
import { REFRESH_INTERVAL } from '../utils/constants';

const useWeather = () => {
  const [city, setCity] = useState('London');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('owm_api_key') || '');
  const intervalRef = useRef(null);

  const saveApiKey = useCallback((key) => {
    localStorage.setItem('owm_api_key', key);
    setApiKey(key);
  }, []);

  const fetchWeatherData = useCallback(async (searchCity) => {
    if (!apiKey) return;
    
    const targetCity = searchCity || city;
    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(targetCity, apiKey),
        fetchForecast(targetCity, apiKey),
      ]);

      setCurrentWeather(currentData);
      setForecast(forecastData);
      setCity(targetCity);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiKey, city]);

  const searchCity = useCallback((newCity) => {
    if (newCity.trim()) {
      fetchWeatherData(newCity.trim());
    }
  }, [fetchWeatherData]);

  // Initial fetch + auto-refresh
  useEffect(() => {
    if (apiKey) {
      fetchWeatherData();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [apiKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Setup auto-refresh
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (apiKey && city) {
      intervalRef.current = setInterval(() => {
        fetchWeatherData();
      }, REFRESH_INTERVAL);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [apiKey, city, fetchWeatherData]);

  return {
    city,
    currentWeather,
    forecast,
    loading,
    error,
    lastUpdated,
    apiKey,
    saveApiKey,
    searchCity,
    refresh: () => fetchWeatherData(),
  };
};

export default useWeather;
