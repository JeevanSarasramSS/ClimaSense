import { getWeatherIconUrl } from '../utils/constants';
import { getWindDirection, formatTime } from '../utils/weatherUtils';

const CurrentWeather = ({ data }) => {
  if (!data) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed, deg },
    visibility,
  } = data;

  const weatherInfo = weather[0];
  const windKmh = (speed * 3.6).toFixed(1);

  return (
    <div className="current-weather glass-card animate-in">
      <div className="cw-main">
        <div className="cw-location">
          <h2>{name}, {country}</h2>
          <p className="cw-description">{weatherInfo.description}</p>
        </div>
        
        <div className="cw-temp-section">
          <img
            src={getWeatherIconUrl(weatherInfo.icon)}
            alt={weatherInfo.description}
            className="cw-icon"
          />
          <div className="cw-temp">
            <span className="temp-value">{Math.round(temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>
        
        <p className="cw-feels">Feels like {Math.round(feels_like)}°C</p>
      </div>

      <div className="cw-details">
        <div className="cw-detail-item">
          <span className="detail-icon">💧</span>
          <div>
            <span className="detail-value">{humidity}%</span>
            <span className="detail-label">Humidity</span>
          </div>
        </div>
        <div className="cw-detail-item">
          <span className="detail-icon">💨</span>
          <div>
            <span className="detail-value">{windKmh} km/h</span>
            <span className="detail-label">Wind {getWindDirection(deg)}</span>
          </div>
        </div>
        <div className="cw-detail-item">
          <span className="detail-icon">🌡️</span>
          <div>
            <span className="detail-value">{pressure} hPa</span>
            <span className="detail-label">Pressure</span>
          </div>
        </div>
        <div className="cw-detail-item">
          <span className="detail-icon">👁️</span>
          <div>
            <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
            <span className="detail-label">Visibility</span>
          </div>
        </div>
        <div className="cw-detail-item">
          <span className="detail-icon">🌅</span>
          <div>
            <span className="detail-value">{formatTime(sunrise)}</span>
            <span className="detail-label">Sunrise</span>
          </div>
        </div>
        <div className="cw-detail-item">
          <span className="detail-icon">🌇</span>
          <div>
            <span className="detail-value">{formatTime(sunset)}</span>
            <span className="detail-label">Sunset</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
