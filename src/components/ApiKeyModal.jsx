import { useState } from 'react';
import './ApiKeyModal.css';

const ApiKeyModal = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-icon">🌤️</div>
        <h2>Welcome to ClimaSense</h2>
        <p className="modal-subtitle">
          Enter your free OpenWeatherMap API key to get started
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            placeholder="Paste your API key here..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoFocus
          />
          <button type="submit" className="modal-button" disabled={!key.trim()}>
            Launch Dashboard
          </button>
        </form>
        
        <a
          href="https://home.openweathermap.org/api_keys"
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          Get a free API key →
        </a>
      </div>
    </div>
  );
};

export default ApiKeyModal;
