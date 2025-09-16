import React from 'react';

/**
 * ProductCard displays a processed millet item with its image, name and
 * description. It exposes "Add to Cart" and "Info" buttons to allow
 * consumers to add the item to their cart or view more details. The
 * functions addToCart and openModal are provided by the parent component.
 */
export default function ProductCard({ product, addToCart, openModal }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <button onClick={() => addToCart(product)} className="add-cart-btn">
        Add to Cart
      </button>
      <button onClick={() => openModal(product)} className="info-btn">
        Info
      </button>
    </div>
  );
}