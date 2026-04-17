const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-icon">⛅</div>
        </div>
        <p className="loading-text">Fetching weather data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
