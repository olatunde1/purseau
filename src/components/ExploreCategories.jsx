import Cloth from '../assets/images/clothCategory.png';
import Bags from '../assets/images/bagCategory.png';
import Shoes from '../assets/images/shoeCategory.png';
import Jewelry from '../assets/images/necklaceCategory.png';
import Hat from '../assets/images/hatCategory.png';
import Brush from '../assets/images/faceBrushCategory.png';
import { Link } from 'react-router-dom';

const ExploreCategories = () => {
  return (
    <>
       {/* Desktop view view for explore by categories */}
       {/* ✅ Desktop Version (visible only on lg and up) */}
      <div className="explore-wrapper border-r-gray-900 hidden lg:block">
        <div className="explore-by-categories">
          <h1 className="explore-text lg:text-4xl text-2xl lg:pt-20 pt-16">Explore By Categories</h1>
          <p className="browse-favorites lg:pb-16 pb-6">
            Browse your favorites by categories
          </p>
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


        {/* Mobile view for explore by categories */}
      <div className="explore-wrapper px-4 sm:px-6 lg:px-12 block lg:hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl pt-10 font-bold">
            Explore By Categories
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Browse your favorites by categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="
          grid 
          grid-cols-3 
          sm:grid-cols-3 
          lg:grid-cols-6 
          gap-2 
          sm:gap-6 
          lg:gap-8
          place-items-center
          bg-[#FFE4DA] p-4
        ">
          {/* Category Item */}
          <Link to="/shop?category=clothes" className="w-full">
            <div className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={Cloth}
                alt="Cloth"
                className="w-full h-28 sm:h-40 lg:h-48 object-cover transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Clothes
                </span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=bags" className="w-full">
            <div className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={Bags}
                alt="Bags"
                className="w-full h-28 sm:h-40 lg:h-48 object-cover transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Bags
                </span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=shoes" className="w-full">
            <div className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={Shoes}
                alt="Shoes"
                className="w-full h-28 sm:h-40 lg:h-48 object-cover transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Shoes
                </span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=jewelries" className="w-full">
            <div className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={Jewelry}
                alt="Jewelry"
                className="w-full h-28 sm:h-40 lg:h-48 object-cover transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Jewelries
                </span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=accessories" className="w-full">
            <div className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={Hat}
                alt="Accessories"
                className="w-full h-28 sm:h-40 lg:h-48 object-cover transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Accessories
                </span>
              </div>
            </div>
          </Link>

          <Link to="/shop?category=beauty" className="w-full">
            <div className="relative group rounded-lg overflow-hidden shadow-md">
              <img
                src={Brush}
                alt="Beauty"
                className="w-full h-28 sm:h-40 lg:h-48 object-cover transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Beauty
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  
  );
};

export default ExploreCategories;
