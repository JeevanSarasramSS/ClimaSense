import { useMemo } from 'react';
import { processDailyData } from '../utils/weatherUtils';
import { getWeatherIconUrl } from '../utils/constants';

const WeeklyForecast = ({ forecastData }) => {
  const dailyData = useMemo(
    () => processDailyData(forecastData?.list),
    [forecastData]
  );

  if (!dailyData.length) return null;

  return (
    <div className="weekly-forecast glass-card animate-in">
      <h3>7-Day Forecast</h3>
      <div className="weekly-list">
        {dailyData.map((day, index) => (
          <div
            className="weekly-item"
            key={day.date}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <span className="weekly-day">{index === 0 ? 'Today' : day.dayName}</span>
            <img
              src={getWeatherIconUrl(day.icon)}
              alt={day.description}
              className="weekly-icon"
            />
            <span className="weekly-desc">{day.description}</span>
            <div className="weekly-temps">
              <span className="weekly-max">{day.maxTemp}°</span>
              <div className="temp-bar">
                <div
                  className="temp-bar-fill"
                  style={{
                    width: `${((day.maxTemp - day.minTemp) / 30) * 100}%`,
                    marginLeft: `${((day.minTemp + 10) / 50) * 100}%`,
                  }}
                />
              </div>
              <span className="weekly-min">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
