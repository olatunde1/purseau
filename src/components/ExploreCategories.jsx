import React from 'react';
import Cloth from '../assets/images/clothCategory.png';
import Bags from '../assets/images/bagCategory.png';
import Shoes from '../assets/images/shoeCategory.png';
import Jewelry from '../assets/images/necklaceCategory.png';
import Hat from '../assets/images/hatCategory.png';
import Brush from '../assets/images/faceBrushCategory.png';

const ExploreCategories = () => {
  return (
    <div className="explore-wrapper">
      <div className="explore-by-categories">
        <h1 className="explore-text">Explore By Categories</h1>
        <p className="browse-favorites">Browse your favorites by categories</p>
      </div>
      <div className="explore-by-categories-images">
        {/* Image with overlay text */}
        <div className="image-container">
          <img src={Cloth} alt="Cloth" />
          <div className="overlay-text">Clothes</div>
        </div>

        <div className="image-container">
          <img src={Bags} alt="Bags" />
          <div className="overlay-text">Bags</div>
        </div>

        <div className="image-container">
          <img src={Shoes} alt="Shoes" />
          <div className="overlay-text">Shoes</div>
        </div>

        <div className="image-container">
          <img src={Jewelry} alt="Jewelry" />
          <div className="overlay-text">Jewelries</div>
        </div>

        <div className="image-container">
          <img src={Hat} alt="Hat" />
          <div className="overlay-text">Accessories</div>
        </div>

        <div className="image-container">
          <img src={Brush} alt="Brush" />
          <div className="overlay-text">Beauty</div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategories;