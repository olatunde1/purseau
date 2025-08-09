import React from 'react';
import Cloth from '../assets/images/clothCategory.png';
import Bags from '../assets/images/bagCategory.png';
import Shoes from '../assets/images/shoeCategory.png';
import Jewelry from '../assets/images/necklaceCategory.png';
import Hat from '../assets/images/hatCategory.png';
import Brush from '../assets/images/faceBrushCategory.png';
import { Link } from 'react-router-dom';

const ExploreCategories = () => {
  return (
    <div className="explore-wrapper border-r-gray-900">
      <div className="explore-by-categories">
        <h1 className="explore-text">Explore By Categories</h1>
        <p className="browse-favorites">Browse your favorites by categories</p>
      </div>
      <div className="explore-by-categories-images">
        {/* Image with overlay text */}
        <Link to="/shop?category=clothes">
          <div className="image-container shadow-md transform transition-transform duration-300 hover:scale-105">
            <img src={Cloth} alt="Cloth" />
            <div className="overlay-text-expolore">Clothes</div>
          </div>
        </Link>

        <Link to="/shop?category=bags">
          <div className="image-container shadow-md transform transition-transform duration-300 hover:scale-105">
            <img src={Bags} alt="Bags" />
            <div className="overlay-text-expolore">Bags</div>
          </div>
        </Link>

        <Link to="/shop?category=shoes">
          <div className="image-container shadow-md transform transition-transform duration-300 hover:scale-105">
            <img src={Shoes} alt="Shoes" />
            <div className="overlay-text-expolore">Shoes</div>
          </div>
        </Link>

        <Link to="/shop?category=jewelries">
          <div className="image-container shadow-md transform transition-transform duration-300 hover:scale-105">
            <img src={Jewelry} alt="Jewelry" />
            <div className="overlay-text-expolore">Jewelries</div>
          </div>
        </Link>

        <Link to="/shop?category=accessories">
          <div className="image-container shadow-md transform transition-transform duration-300 hover:scale-105">
            <img src={Hat} alt="Accessories" />
            <div className="overlay-text-expolore">Accessories</div>
          </div>
        </Link>

        <Link to="/shop?category=beauty">
          <div className="image-container shadow-md transform transition-transform duration-300 hover:scale-105">
            <img src={Brush} alt="beauties" />
            <div className="overlay-text-expolore">Beauty</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExploreCategories;