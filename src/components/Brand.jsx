import React from "react";
import Brand1 from '../assets/images/brand1.png'
import Brand2 from '../assets/images/brand2.png'
import Brand3 from '../assets/images/brand3.png'
import Brand4 from '../assets/images/brand4.png'
import Brand5 from '../assets/images/brand5.png'
import Brand6 from '../assets/images/brand6.png'

const logos = [
  Brand1,
  Brand2,
  Brand3,
  Brand4,
  Brand5,
  Brand6,
  
];

const BrandMarquee = () => {
  return <>
      <div className="brand">
        <h1>Brands</h1>
        <p>In a laoreet purus. Integer turpis quam, laoreet id orci nec, <br />ultrices lacinia nunc. Aliquam erat vo</p>
    </div>
    <div className=" relative w-full overflow-hidden  w-full  py-8 brand-logo">
      {/* Logo Container */}
      <div className="flex animate-marquee space-x-8 flex justify-between items-center ">
        {logos.map((logo, index) => (
          <div key={index} className="flex-1 flex justify-center">
            <img src={logo} alt={`Logo ${index + 1}`} className="" />
          </div>
        ))}
      </div>
    </div>
  </>
  
 
};

export default BrandMarquee;