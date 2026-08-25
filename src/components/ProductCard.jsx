import React from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.thumbnail} alt={product.title} className="product-image" loading="lazy" />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <Star size={14} className="star-icon" fill="currentColor" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <div className="product-price">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
