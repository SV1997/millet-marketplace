import React from 'react';

/**
 * Slider component shows a single image from an array and renders dots for
 * navigation. The currentSlide index determines which image to display.
 * Clicking a dot calls setCurrentSlide with the corresponding index.
 */
export default function Slider({ images, currentSlide, setCurrentSlide }) {
  return (
    <div className="slider">
      <img
        src={images[currentSlide]}
        alt="Slide"
        className="slider-image"
      />
      <div className="slider-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}