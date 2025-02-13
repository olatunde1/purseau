import React from 'react';
import { Button } from '../components/ui/button';
import { SlArrowRight } from "react-icons/sl";
import './home.css';

const Home = () => {
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

    <div className="discover">
        <h1>Discover What Sets Us Apart</h1>
        <p>We provide you with the best customer experience</p>
    </div></>
  
  
};

export default Home;