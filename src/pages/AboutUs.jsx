import React from 'react'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VisionIcon1 from '../assets/images/Frame 77.png'
import VisionIcon2 from '../assets/images/Frame 77-1.png'
import VisionIcon3 from '../assets/images/Frame 1000011190.png'
import OurVision from '../assets/images/our-vision-image.png'
import Retail from '../assets/images/retail.png'
import Wholesale from '../assets/images/wholesale.png'
import DropShipping from '../assets/images/dropshipping.png'
import TheBeginning from '../assets/images/the-beginning.png'
import GrowthInnovation from '../assets/images/growth-innovation.png'
import Today from '../assets/images/today.png'
import { StayLoop } from '@/components/StayLoop';
import { Footer } from '@/components/Footer';



export default function AboutUs() {
  return <>
    <div className='about-us'>
            <h1>About Us</h1>
            <p>Everything you need to know about us</p>
        </div>

    <Card className="flex flex-col md:flex-row items-center justify-between  p-8 md:p-40 ">
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900">Our Vision</h1>
        <p className="text-gray-600 mt-4">
        At Purseau, our mission is to redefine women’s fashion by offering a seamless blend of style, quality, and accessibility. We believe that fashion is more than just clothing—it’s a powerful form of self-expression that inspires confidence and celebrates individuality. We are committed to creating timeless pieces that resonate with every woman, no matter her style or background. Through careful curation and design, we strive to provide collections that cater to all occasions—whether it’s a casual day out, a professional setting, or a special event. Sustainability is at the heart of what we do. From choosing eco-friendly materials to reducing waste in our production and packaging processes, we are dedicated to protecting our planet while delivering the best to our customers. Equally important is our commitment to ethical practices. We partner with suppliers who share our values, ensuring fair wages, safe working environments, and respect for all workers in our supply chain.
        </p>

        <div className="col-md-6 flex md:flex-row our-vision-icons">
            <div className="exclusive-female">
                <img src={VisionIcon1} alt="" srcset="" />
                <p>Exclusive Female-Focused Collections</p>
            </div>
            <div className="high-quality">
            <img src={VisionIcon2} alt="" srcset="" />
                <p>Access to 100% High-Quality Products</p></div>
            <div className="partner-with-us">
                <img src={VisionIcon3} alt="" srcset="" />
                <p>Partner with us for hassle-free drop shipping—quality fashion.</p>
            </div>
        </div>
        {/* <Button className="mt-6">Shop Now</Button> */}
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img
          src={OurVision}
          alt="Fashion Display"
          className="w-full max-w-sm rounded-xl shadow-lg"
        />
      </div>
    </Card>

    {/* OUR SERVICES SECTION */}

    <div className="our-services">
    <div className="our-services-text text-center">
        <h1>Our Services</h1>
        <p>Discover what we offer</p>
    </div>
    <div className="product-text">
        <div className="service-item">
            <img src={Retail} alt="Retail Products" />
            <div className="service-item-text">
                <h1>Retail Products</h1>
                <p>Phasellus accumsan imperdiet tempor. Cras tincidunt, arcu nec</p>
            </div>
        </div>
        <div className="service-item">
            <img src={Wholesale} alt="Wholesale Products" />
            <div className="service-item-text">
                <h1>Wholesale Products</h1>
                <p>Phasellus accumsan imperdiet tempor. Cras tincidunt, arcu nec</p>
            </div>
        </div>
        <div className="service-item">
            <img src={DropShipping} alt="Drop Shipping" />
            <div className="service-item-text">
                <h1>Drop Shipping</h1>
                <p>Phasellus accumsan imperdiet tempor. Cras tincidunt, arcu nec</p>
            </div>
        </div>
    </div>
    </div>

    {/* OUR STORY SECTION */}

    <div className="our-story">
    <div className="our-story-text text-center">
        <h1>Our Story</h1>
        <p>Discover what motivates us</p>
    </div>

    <p className="our-story-description">
        From humble beginnings to a global fashion destination, Purseu has grown by empowering women through timeless, high-quality designs. Today, we continue to innovate while staying true to our commitment to style, sustainability, and individuality.
    </p>

    <div className="story-card-container">
        <div className="story-card">
            <img src={TheBeginning} alt="The-Beginning" className="card-image" />
            <div className="card-content">
                <h2>The Beginning</h2>
                <p>
                Purseu started with a simple vision: to empower women through fashion. From day one, we focused on creating stylish, high-quality pieces that inspire confidence and individuality.
                </p>
            </div>
        </div>
        <div className="story-card2">
            <img src={GrowthInnovation} alt="2010" className="card-image" />
            <div className="card-content">
                <h2>Growth and Innovation</h2>
                <p>Over the years, we’ve expanded our collections, embraced sustainable practices, and adopted cutting-edge technology to enhance the shopping experience. Innovation has been at the heart of everything we do.</p>
            </div>
        </div>
        <div className="story-card3">
            <img src={Today} alt="2023" className="card-image" />
            <div className="card-content">
                <h2>Today</h2>
                <p>Today, Purseau stands as a trusted destination for women’s fashion, offering timeless styles and trend-forward pieces to customers around the world. We continue to evolve, with our commitment.</p>
            </div>
        </div>
    </div>
</div>

<StayLoop />
<Footer />

</>
   
}
