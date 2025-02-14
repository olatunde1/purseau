import React from 'react';
import { Button } from '../components/ui/button';
import { SlArrowRight } from "react-icons/sl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Icon1 from '../assets/images/icon1.png'
import Icon2 from '../assets/images/icon2.png'
import Icon3 from '../assets/images/icon3.png'
import Icon4 from '../assets/images/icon4.png'
import newArrival from '../assets/images/newArrival.png'
import bestSeller from '../assets/images/best sellers.png'
import trending from '../assets/images/trending.png'
import Cloth from '../assets/images/clothCategory.png'
import Bags from '../assets/images/bagCategory.png'
import Shoes from '../assets/images/shoeCategory.png'
import Jewelry from '../assets/images/necklaceCategory.png'
import Hat from '../assets/images/hatCategory.png'
import Brush from '../assets/images/faceBrushCategory.png'


import './home.css';

 
const Home = () => {
  const notifications = [
    {
      image: Icon1,
      title: "Revolutionary Image Search Technology",
      description: "Find your dream outfit by simply uploading an image.",
    },
    {
      image: Icon2,
      title: "Exclusive Female-Focused Collections",
      description: "Exclusive curated fashion products, for every women.",
    },
    {
      image: Icon3,
      title: "Trendy, Affordable, and High-Quality Products ",
      description: "Stylish and durable fashion products without breaking the bank.",
    },
    {
      image: Icon4,
      title: "Hassle-Free Returns for Peace of Mind",
      description: "Change your mind? No problem. Easy returns guaranteed.",
    },
  ];

  return <>
  
  <div className="wrap">
      <div className="container2">
        <h1 className="unleash">Unleash Your Feminine <br /> Style with Purseau.</h1>
        <p className="discover">Discover trendy fashion items and accessories, exclusively designed <br /> for women.</p>
        <Button className="explore">
          Explore <SlArrowRight />
        </Button>
      </div>
  </div>

    <div className="discovery">
      <h1>Discover What Sets Us Apart</h1>
      <p>We provide you with the best customer experience</p>
    </div>
    
    <div className="notification-list">
      
      {notifications.map((notification, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
          <img src={notification.image} alt={notification.title} className="notification-image" />
          </CardHeader>
          <CardContent>
            <p className='notification-title'>{notification.title}</p>
          </CardContent>
          <CardFooter>
            <p className='notification-description'>{notification.description}</p> 
          </CardFooter>
        </Card>
      ))}
    </div>


  <div className="container">
    <div className="arrival">
    <div className="newArrivalWrap">
      <img src={newArrival} alt="New Arrival" className='newArrival'/>
      <div className="overlay">
          <h2 className="overlay-title">New Arrivals</h2>
          <p className="overlay-text">Your Wardrobe Deserves Something New - Shop now <br /> to grab our latest arrivals</p>
          <Button className="overlay-button">Shop Now <SlArrowRight /></Button>
      </div>
      </div>
    <div className="trendBestSells">
      <div className="trendingClothWrap">
        <img src={trending} alt="Trending Cloth" className='trendingCloth' />
        <div className="overlayTrending">
            <h2 className="overlayTrending-title">Trending Now</h2>
            <p className="overlay-text">Discover the latest trending picks that define chic & <br /> confidence</p>
            <Button className="overlay-button">Explore <SlArrowRight /></Button>
        </div>
      </div>
      <div className="bestSellingWrap">
        <img src={bestSeller} alt="Best Selling Cloths" className='bestSellingCloth' />
        <div className="overlayTrending">
              <h2 className="overlayTrending-title">Best Sellers</h2>
              <p className="overlay-text">YTried, Tested & Loved – Our Top Picks Fashion Hits <br /> You’ll Love Forever</p>
              <Button className="overlay-button">Discover <SlArrowRight /></Button>
        </div>
      </div>
    </div>
    </div>
  </div>
    
  <section>
    <div className=" container3">
      <div className="explore-by-categories">
        <h1 className='explore-text'>Explore By Categories</h1>
        <p>Browse you favorites by categories</p>
      </div>
      <div className="explore-by-categories-images">
          <img src={Cloth} alt="" />
          <img src={Bags} alt="" />
          <img src={Shoes} alt="" />
          <img src={Jewelry} alt="" />
          <img src={Hat} alt="" />
          <img src={Brush} alt="" />

      </div>
    </div>
  </section>
      



  </>
  
  
};

export default Home;


