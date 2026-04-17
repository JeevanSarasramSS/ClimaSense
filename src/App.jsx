import { useMemo } from 'react';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastChart from './components/ForecastChart';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherMap from './components/WeatherMap';
import SmartInsights from './components/SmartInsights';
import ApiKeyModal from './components/ApiKeyModal';
import LoadingSpinner from './components/LoadingSpinner';
import { getWeatherGradient } from './utils/constants';
import './App.css';

function App() {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    lastUpdated,
    apiKey,
    saveApiKey,
    searchCity,
  } = useWeather();

  // Dynamic background gradient based on weather
  const backgroundGradient = useMemo(() => {
    if (!currentWeather) return 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)';
    const { weather } = currentWeather;
    return getWeatherGradient(weather[0].id, weather[0].icon);
  }, [currentWeather]);

  // Show API key modal if no key
  if (!apiKey) {
    return (
      <div className="app" style={{ background: backgroundGradient }}>
        <ApiKeyModal onSave={saveApiKey} />
      </div>
    );
  }

  return (
    <div className="app" style={{ background: backgroundGradient }}>
      <div className="app-inner">
        <SearchBar
          onSearch={searchCity}
          currentCity={currentWeather?.name}
          lastUpdated={lastUpdated}
        />

        {loading && !currentWeather && <LoadingSpinner />}

        {error && (
          <div className="error-card glass-card animate-in">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {currentWeather && (
          <>
            {loading && (
              <div className="refresh-indicator">
                <div className="refresh-dot"></div>
                Updating...
              </div>
            )}

            <div className="dashboard-grid">
              <div className="grid-main">
                <CurrentWeather data={currentWeather} />
                <ForecastChart forecastData={forecast} />
              </div>

              <div className="grid-side">
                <WeatherMap currentWeather={currentWeather} />
                <SmartInsights currentWeather={currentWeather} />
              </div>
            </div>

            <WeeklyForecast forecastData={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
