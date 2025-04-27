import React from 'react';
import '../../styles/loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <i className="fas fa-graduation-cap cap-icon"></i>
        <div className="loader-text">
          <span>U</span>
          <span>n</span>
          <span>i</span>
          <span>M</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loader;