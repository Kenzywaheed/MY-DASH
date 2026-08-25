// src/components/Loader.jsx
import React from 'react';

export const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="spinner"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="skeleton-image"></div>
      <div className="product-details">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line price"></div>
      </div>
    </div>
  );
};
