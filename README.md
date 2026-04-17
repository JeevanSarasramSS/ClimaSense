<p align="center">
  <img src="https://img.icons8.com/3d-fluency/94/partly-cloudy-day.png" alt="ClimaSense Logo" width="80"/>
</p>

<h1 align="center">ClimaSense — Weather Intelligence Dashboard</h1>

<p align="center">
  <strong>A real-time, visually stunning weather intelligence dashboard that transforms raw weather data into actionable insights.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Recharts-3-FF6384?style=for-the-badge" alt="Recharts"/>
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet"/>
  <img src="https://img.shields.io/badge/Cost-$0-brightgreen?style=for-the-badge" alt="Free"/>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌡️ **Real-Time Weather** | Current temperature, feels like, humidity, wind speed, pressure, visibility, sunrise/sunset |
| 📊 **24-Hour Forecast Chart** | Interactive area chart with smooth animations — toggle between temperature and humidity |
| 📅 **7-Day Forecast** | Daily cards with weather icons, min/max temperatures, and temperature range bars |
| 🗺️ **Interactive Map** | Leaflet.js map with dark CartoDB tiles, custom temperature markers, and fly-to animations |
| 🧠 **Smart Insights** | Rule-based weather intelligence — heat alerts, humidity warnings, wind analysis, feels-like comparison |
| 🎨 **Dynamic Backgrounds** | Gradient backgrounds that shift based on weather (sunny, rainy, cloudy, night, thunderstorm, snow) |
| 🪟 **Glassmorphism UI** | Premium frosted-glass cards with `backdrop-filter: blur()` and subtle borders |
| 🔄 **Auto-Refresh** | Weather data refreshes automatically every 5 minutes |
| 📱 **Responsive Design** | Fully responsive — works seamlessly on desktop, tablet, and mobile |
| 🔐 **Persistent API Key** | Enter your API key once, stored securely in localStorage |

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Charts** | Recharts 3 |
| **Maps** | Leaflet.js + React-Leaflet |
| **Styling** | Vanilla CSS (Glassmorphism) |
| **API** | OpenWeatherMap (Free Tier) |
| **Fonts** | Google Fonts — Inter |

---

## 📁 Project Structure

```
ClimaSense/
├── public/
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.jsx      # First-time API key entry modal
│   │   ├── ApiKeyModal.css      # Modal glassmorphism styles
│   │   ├── SearchBar.jsx        # City search with branding
│   │   ├── CurrentWeather.jsx   # Hero card — current conditions
│   │   ├── ForecastChart.jsx    # 24h interactive area chart
│   │   ├── WeeklyForecast.jsx   # 7-day forecast cards
│   │   ├── WeatherMap.jsx       # Leaflet interactive map
│   │   ├── SmartInsights.jsx    # Rule-based weather insights
│   │   └── LoadingSpinner.jsx   # Animated loading state
│   ├── hooks/
│   │   └── useWeather.js        # Custom hook — API calls + auto-refresh
│   ├── utils/
│   │   ├── api.js               # OpenWeatherMap API functions
│   │   ├── constants.js         # Gradients, icons, config
│   │   └── weatherUtils.js      # Data processing + insight engine
│   ├── App.jsx                  # Main dashboard layout
│   ├── App.css                  # Global styles + responsive design
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
├── requirements.txt             # Project dependencies reference
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenWeatherMap API Key** (Free) — [Get one here](https://home.openweathermap.org/api_keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ClimaSense.git
   cd ClimaSense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

5. **Enter your API key** in the modal and search for any city!

> ⚠️ **Note:** New OpenWeatherMap API keys can take **up to 2 hours** to activate after creation. If you see "Invalid API key", wait and try again.

---

## 🔑 API Configuration

ClimaSense uses the **OpenWeatherMap Free Tier** — completely free, no credit card required.

| Endpoint | Data | Free Limit |
|----------|------|-----------|
| `/weather` | Current weather conditions | 60 calls/min |
| `/forecast` | 5-day / 3-hour forecast | 60 calls/min |

Your API key is stored in your browser's `localStorage` — it never leaves your device.

---

## 🎨 Design Highlights

- **Dynamic Gradient Backgrounds** — 8 unique gradients for different weather conditions
- **Glassmorphism Cards** — `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Smooth Animations** — CSS keyframe animations for fade-in, slide-up, and floating effects
- **Custom Map Markers** — Temperature badges with gradient backgrounds on dark map tiles
- **Responsive Grid** — CSS Grid layout that adapts from 2-column (desktop) to single-column (mobile)

---

## 🧠 Smart Insights Engine

The insights engine uses rule-based analysis to generate actionable weather intelligence:

| Condition | Insight |
|-----------|---------|
| Temp > 40°C | 🔥 Extreme heat alert |
| Temp < 0°C | 🥶 Freezing conditions |
| Humidity > 85% | 💧 Very high humidity |
| Wind > 30 km/h | 💨 Strong winds |
| Feels Like ≠ Actual (>5°C diff) | 🌡️ Temperature perception alert |
| Humidity < 30% | 🏜️ Low humidity warning |

---

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory, ready for deployment on any static hosting (Vercel, Netlify, GitHub Pages).

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React, Recharts, and Leaflet.js
</p>
