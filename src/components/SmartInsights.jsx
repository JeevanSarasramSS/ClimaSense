import { useMemo } from 'react';
import { generateInsights } from '../utils/weatherUtils';

const SmartInsights = ({ currentWeather }) => {
  const insights = useMemo(
    () => generateInsights(currentWeather),
    [currentWeather]
  );

  if (!insights.length) return null;

  const severityColors = {
    danger: 'rgba(245, 87, 108, 0.25)',
    warning: 'rgba(253, 160, 133, 0.2)',
    info: 'rgba(102, 126, 234, 0.2)',
    good: 'rgba(72, 199, 142, 0.2)',
  };

  const severityBorders = {
    danger: 'rgba(245, 87, 108, 0.5)',
    warning: 'rgba(253, 160, 133, 0.4)',
    info: 'rgba(102, 126, 234, 0.4)',
    good: 'rgba(72, 199, 142, 0.4)',
  };

  return (
    <div className="smart-insights glass-card animate-in">
      <h3>🧠 Smart Insights</h3>
      <div className="insights-list">
        {insights.map((insight, index) => (
          <div
            className="insight-item"
            key={index}
            style={{
              background: severityColors[insight.severity],
              borderLeft: `3px solid ${severityBorders[insight.severity]}`,
              animationDelay: `${index * 0.12}s`,
            }}
          >
            <span className="insight-icon">{insight.icon}</span>
            <p className="insight-text">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartInsights;
