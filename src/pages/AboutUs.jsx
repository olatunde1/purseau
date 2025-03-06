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

  </>
   
}
