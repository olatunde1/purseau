import React from 'react';
import ClothBackground from '../assets/images/cloth-background.png';
import BagsBackground from '../assets/images/bags-background.png';
import ShoesBackground from '../assets/images/shoes-background.png';
import JewelryBackground from '../assets/images/jewelry-background.png';
import BeautyBackground from '../assets/images/beauty-background.png';
import AccessoriesBackground from '../assets/images/accessories-background.png';
import ShopBackground from '../assets/images/shop-background.png';
import ShoppingBackground from '../assets/images/shopping-cart.png'

const SubMenu = ({ category }) => {
  let title;
  let description;
  let background;

  switch (category) {
    case "cloth":
      title = "Cloth";
      description = "Shop the Latest trends in Women's Fashion";
      background = ClothBackground;
      break;
    case "bags":
      title = "Bags";
      description = "Discover our range of stylish bags";
      background = BagsBackground;
      break;
    case "shoes":
      title = "Shoes";
      description = "Shop the Latest trends in Women's Fashion";
      background = ShoesBackground;
      break;
    case "jewelry":
      title = "Jewelries";
      description = "Shop the Latest trends in Women's Fashion";
      background = JewelryBackground;
      break;
    case "beauty":
      title = "Beauty";
      description = "Explore our beauty products";
      background = BeautyBackground;
      break;
    case "accessories":
      title = "Accessories";
      description = "Explore our beauty products";
      background = AccessoriesBackground;
      break;
    case "shopping-cart":
      title = "Shopping Cart";
      description = "View your picks, update as needed, and checkout with ease!";
      background = ShoppingBackground;
      break;
    default:
      title = "Shop";
      description = "Shop the Latest trends in Women's Fashion";
      background = ShopBackground;
  }

  return (
    <div
      className='shop'
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px', // Adjust height as needed
        width: '100%',   // Ensure full width
        maxWidth: '1200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SubMenu;
