import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaStar } from 'react-icons/fa';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import ExploreSimilarProduct from '@/components/ExploreSimilarProduct';
import YouMightAlsoLike from '@/components/YouMightLike';
import RecentlyViewed from '@/components/RecentlyViewed';
import { StayLoop } from '@/components/StayLoop';
import { Footer } from '@/components/footer'
import Bag1 from '../assets/images/prod-desc-bag1.png'
import Bag2 from '../assets/images/prod-desc-bag2.png'
import Bag3 from '../assets/images/prod-desc-bag3.png'
import Bag4 from '../assets/images/prod-desc-bag4.png'
import { RiErrorWarningLine } from "react-icons/ri";
import ReviewSection from '@/components/ReviewSection';
import Pagination from '@/components/Pagination';
import { Link } from 'react-router-dom';
import Cart from '../assets/images/cart.png'



const product = {
  name: "A Cute Ladies Hand And Shoulder Bag",
  rating: 4.8,
  reviews: 456,
  stock: "In Stock",
  originalPrice: 48000,
  discountedPrice1: 46820,
  discountedPrice2: 45000,
  discount: "-23%",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

  additionalInfo: {
    SKU: "123456789",
    Material: "High-quality Leather",
    Size: "Medium (30cm x 20cm x 15cm)",
    Color: "Red, Blue, Black, Green, Yellow",
    Brand: "Eloqwnt Fashion",
    Weight: "0.75 kg",
  },
  
  customerReviews: {
    total: 456,
    rating: 4.8,
    breakdown: {
      5: 320,
      4: 90,
      3: 30,
      2: 10,
      1: 6,
    },
  },

  availableColors: ["Red", "Blue", "Black", "Green", "Yellow"],
  images: [
    Bag1,
    Bag2,
    Bag3,
    Bag4,
  ]

};

const colorMap = {
  Red: "bg-[#CDC3AD]",
  Blue: "bg-[#D9ACBB]",
  Black: "bg-[#000000]",
  Green: "bg-[#CDCFC4]",
  Yellow: "bg-yellow-500",
};

const borderColorMap = {
  Red: "border-[#CDC3AD]",
  Blue: "border-[#D9ACBB]",
  Black: "border-black",
  Green: "border-[#CDCFC4]",
  Yellow: "border-yellow-500",
};

  

const ProductDescription = () => {
  const [selectedColor, setSelectedColor] = useState("Red");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [userRating, setUserRating] = useState(0);
  const [activeSection, setActiveSection] = useState("description");

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const [activeButton, setActiveButton] = useState(null); // 'cart' | 'buy' | null
  



  return <>
<div className="container mx-auto px-4 py-8 font-lato">
     {/* Breadcrumb Section */}
     <div className="breadcrumb mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Bags</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Product Images */}
        <div className="flex flex-col">
          <img src={selectedImage} alt="Product" className="md:w-[360px] w-full h-96 object-cover rounded-lg" />
          <div className="flex gap-2 mt-4">
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === img ? "border-[#E94E30]" : "border-gray-300"}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          
          {/* Rating */}
           <div className="flex items-center gap-2 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar 
                key={star} 
                className={`cursor-pointer ${star <= userRating ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setUserRating(star)}
              />
            ))}
            <span className="text-gray-700">({product.reviews} Reviews)</span>
          </div>
          {/* Stock Status */}
          <p className="text-green-600 font-semibold rounded-full bg-[#E6F4F1] w-24 flex gap-1 "><RiErrorWarningLine className='mt-1 ml-2 ' />{product.stock}</p>

          {/* Price Section */}
          <div className="mt-3 flex items-center gap-8">
            <p className="text-red-500 font-extrabold text-xl">₦ {product.originalPrice.toLocaleString()}</p>
            <p className="text-gray-400 line-through text-sm">₦ {product.discountedPrice1.toLocaleString()}</p>
            <p className="text-gray-400 line-through text-sm">₦ {product.discountedPrice2.toLocaleString()}</p>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md">{product.discount}</span>
          </div>

          {/* Bulk Purchase Pricing */}
          <div className="mt-4">
            <div className="grid gap-6 font-semibold ">
             <div className="flex gap-16">
                <p className="text-gray-400 line-through text-sm">₦ {product.originalPrice.toLocaleString()}</p>
                <p className="text-gray-400 line-through text-sm">₦ {product.discountedPrice1.toLocaleString()}</p>
                <p className="text-gray-400 line-through text-sm">₦ {product.discountedPrice2.toLocaleString()}</p>
             </div>
            <div className="flex gap-16">
                 <p className="text-gray-600">1 piece</p>
                 <p className="text-gray-600">3-12 pieces</p>
                 <p className="text-gray-600">13 upward</p>
            </div>
             
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Color Selector */}
          <div className="mt-4">
      <p className="font-semibold mb-1">Available Colors</p>
      <div className="flex gap-2">
        {product.availableColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center 
              transition-all duration-300
              ${colorMap[color]}
              border-transparent
              hover:${borderColorMap[color]}
              hover:scale-105
              ${selectedColor === color ? 'ring-2 ring-offset-2 ring-[#E94E30]' : ''}`}
            aria-label={`${color} color option`}
          />
        ))}
      </div>
    </div>


          {/* Quantity Selector */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Quantity</p>
            <div className="flex items-center rounded-lg py-4 w-40 justify-between gap-4 ">
              <Button
                variant="ghost"
                onClick={decreaseQuantity}
                className="w-10 h-10 flex items-center justify-center 
                          text-[#E94E30] bg-[#FFE4DA] 
                          hover:bg-red-600 hover:text-white 
                          shadow-md hover:shadow-lg 
                          transition-all duration-200"
              >
                <IoMdRemove size={20} />
              </Button>
              <span className="text-lg font-semibold">{quantity}</span>
              <Button
                variant="ghost"
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center 
                          text-[#E94E30] bg-[#FFE4DA] 
                          hover:bg-red-600 hover:text-white 
                          shadow-md hover:shadow-lg 
                          transition-all duration-200"
              >
                <IoMdAdd size={20} />
              </Button>
            </div>
          </div>


          {/* Buttons */}
          <div className="mt-6 flex flex-wrap sm:flex-nowrap gap-4">
            <Link to="/shopping-cart">
              <Button
                onClick={() => setActiveButton("cart")}
                className={`group w-full sm:w-[288px] px-16 py-[18.5px] rounded-md border transition-colors duration-300 ${
                  activeButton === "cart"
                    ? "bg-[#E94E30] text-white border-[#E94E30]"
                    : "bg-white text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white"
                }`}
              >
                <img
                  src={Cart}
                  alt="Cart"
                  width="24px"
                  height="24px"
                  className={`mr-2 transition-all duration-300 ${
                    activeButton === "cart"
                      ? "filter invert brightness-0 contrast-200"
                      : "filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
                  }`}
                />
                Add To Cart
              </Button>
            </Link>

            <Button
              onClick={() => setActiveButton("buy")}
              className={`w-full sm:w-[288px] px-16 py-[18.5px] rounded-md border transition-colors duration-300 ${
                activeButton === "buy"
                  ? "bg-[#E94E30] text-white border-[#E94E30]"
                  : "bg-white text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white"
              }`}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

  
    {/* Section Tabs */}
   <div className="product-tabs mt-8 ">
   <div className="mt-6 flex gap-4 border-b justify-center">
            {['description', 'additionalInfo', 'customerReviews'].map((section) => (
              <button 
                key={section} 
                className={`pb-2 px-4 font-semibold   ${activeSection === section ? 'border-b-2 border-[#E94E30] text-[#E94E30]' : 'text-gray-600'}`}
                onClick={() => setActiveSection(section)}
              >
                {section === 'description' ? 'Product Description' : section === 'additionalInfo' ? 'Additional Information' : 'Customer Reviews'}
              </button>
            ))}
    </div>
          {/* Section Content */}
          <div className="mt-4 text-gray-600">
            {activeSection === 'description' && (
                <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
                    <p>{product.description}</p>
                    <p className='mt-6'>Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <ul className="list-disc ml-6 mt-6">
                        <li className='mt-6'>Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus bl</li>
                        <li className='mt-6'>Aliquam porta nisl dolor, molestie pellentesque elit molestie in. Morbi metus neque, elementum ullam</li>
                        <li className='mt-6'>Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibus.</li>
                        <li className='mt-6'>Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibus.</li>
                    </ul>
                </div>
            )}
            {activeSection === 'additionalInfo' && (
                <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
                  <table className="w-full border-collapse">
                    <tbody>
                        <tr className="border-b bg-[#ECC297] ">
                            <td className="p-3 font-bold text-gray-700">Feature</td>
                            <td className="p-3 font-bold text-gray-700">Description</td>
                        </tr>
                      {Object.entries(product.additionalInfo).map(([key, value]) => (
                        <tr className="border-none bg-[#FFF4F0] " key={key}>
                          <td className="p-3 font-semibold  ">{key}</td>
                          <td className="p-3">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
            {activeSection === 'customerReviews' && (
                <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
                    <div className="flex flex-col md:flex-row gap-8 mt-4 mx-auto justify-center md:w-[1200px] w-full">
                    <div className="flex flex-col items-center w-full md:w-1/6 border p-4 rounded-md bg-[#FFE4DA]">
                    
                        <p className="text-4xl font-bold text-[#E94E30]">{product.customerReviews.rating}</p>
                        <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(product.customerReviews.rating) ? 'text-[#E94E30]' : 'text-gray-300'} />
                        ))}
                        </div>
                        <p className="text-gray-600">({product.customerReviews.total} Reviews)</p>
                    </div>
                    <div className="w-full md:w-2/3">
                        {Object.entries(product.customerReviews.breakdown).reverse().map(([stars, count]) => (
                        <div key={stars} className="flex items-center gap-2 mb-2">
                            <p className="w-16 font-semibold">{stars} Star</p>
                            <div className="w-full bg-[#FFF4F0] rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-[#E94E30] rounded-full h-4"
                                style={{ width: `${(count / product.customerReviews.total) * 100}%` }}
                            ></div>
                            </div>
                            {/* <p className="w-8 text-right">{count}</p> */}
                        </div>
                        ))}
                    </div>
                    </div>
                <ReviewSection />
               </div>
              )}
          </div>

   </div>


</div>
<Pagination />
<ExploreSimilarProduct />
<YouMightAlsoLike />
<div className="mt-20">
    <RecentlyViewed />
</div>
<StayLoop />
<Footer />


</>
  
  
};

export default ProductDescription;
