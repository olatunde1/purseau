
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
      <div className="brand lg:pt-20 pt-10 lg:pb-10">
        <h1>Brands</h1>
        <p className='px-8 lg:w-[485px] mx-auto pb-8'>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc. Aliquam erat vo</p>
    </div>
    <div className=" relative w-full overflow-hidden  py-4 brand-logo">
      {/* Logo Container */}
      <div className="flex animate-marquee space-x-8 justify-between items-center ">
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