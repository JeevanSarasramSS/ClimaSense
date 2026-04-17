import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { processHourlyData } from '../utils/weatherUtils';

const CustomTooltip = ({ active, payload, label, dataKey }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip glass-card">
      <p className="tooltip-time">{label}</p>
      <p className="tooltip-value">
        {payload[0].value}{dataKey === 'temp' ? '°C' : '%'}
      </p>
    </div>
  );
};

const ForecastChart = ({ forecastData }) => {
  const [dataKey, setDataKey] = useState('temp');
  
  const hourlyData = useMemo(
    () => processHourlyData(forecastData?.list),
    [forecastData]
  );

  if (!hourlyData.length) return null;

  const gradientColor = dataKey === 'temp' ? '#f5576c' : '#667eea';
  const gradientColorEnd = dataKey === 'temp' ? '#fda085' : '#764ba2';

  return (
    <div className="forecast-chart glass-card animate-in">
      <div className="chart-header">
        <h3>24-Hour Forecast</h3>
        <div className="chart-toggle">
          <button
            className={`toggle-btn ${dataKey === 'temp' ? 'active' : ''}`}
            onClick={() => setDataKey('temp')}
          >
            🌡️ Temperature
          </button>
          <button
            className={`toggle-btn ${dataKey === 'humidity' ? 'active' : ''}`}
            onClick={() => setDataKey('humidity')}
          >
            💧 Humidity
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={gradientColorEnd} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.4)"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              unit={dataKey === 'temp' ? '°' : '%'}
            />
            <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={gradientColor}
              strokeWidth={3}
              fill="url(#chartGradient)"
              animationDuration={1000}
              animationEasing="ease-in-out"
              dot={{ fill: gradientColor, r: 4, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
