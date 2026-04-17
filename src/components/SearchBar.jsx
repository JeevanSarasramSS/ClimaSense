import { useState } from 'react';

const SearchBar = ({ onSearch, currentCity, lastUpdated }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="search-bar">
      <div className="search-left">
        <h1 className="brand">
          <span className="brand-icon">⛅</span> ClimaSense
        </h1>
        {lastUpdated && (
          <span className="last-updated">
            Updated {lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
        )}
      </div>
      
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search any city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
