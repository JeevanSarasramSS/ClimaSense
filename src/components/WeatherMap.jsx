import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to fly to new location
const FlyToLocation = ({ lat, lon }) => {
  const map = useMap();
  const prevCoords = useRef({ lat: 0, lon: 0 });

  useEffect(() => {
    if (lat !== prevCoords.current.lat || lon !== prevCoords.current.lon) {
      map.flyTo([lat, lon], 10, { duration: 1.5 });
      prevCoords.current = { lat, lon };
    }
  }, [lat, lon, map]);

  return null;
};

const WeatherMap = ({ currentWeather }) => {
  if (!currentWeather) return null;

  const { coord: { lat, lon }, name, main: { temp }, weather } = currentWeather;
  const weatherInfo = weather[0];

  // Custom marker with temperature
  const tempIcon = L.divIcon({
    className: 'custom-temp-marker',
    html: `
      <div class="marker-container">
        <div class="marker-temp">${Math.round(temp)}°C</div>
        <div class="marker-pin"></div>
      </div>
    `,
    iconSize: [60, 50],
    iconAnchor: [30, 50],
  });

  return (
    <div className="weather-map glass-card animate-in">
      <h3>📍 Location Map</h3>
      <div className="map-container">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', borderRadius: '16px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={[lat, lon]} icon={tempIcon}>
            <Popup>
              <strong>{name}</strong><br />
              {Math.round(temp)}°C — {weatherInfo.description}
            </Popup>
          </Marker>
          <FlyToLocation lat={lat} lon={lon} />
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap;
