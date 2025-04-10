import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Star, Heart } from "lucide-react"; // For star icons (install lucide-react if not already installed)
import { useNavigate, Link } from "react-router-dom"; // For navigation
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"; // shadcn/ui Card
// import cloth category
import clothe1 from '../assets/images/image1.png'
import clothe2 from '../assets/images/image2.png'
import clothe3 from '../assets/images/image3.png'
import clothe4 from '../assets/images/image4.png'
import clothe5 from '../assets/images/image5.png'
import clothe6 from '../assets/images/image6.png'
import clothe7 from '../assets/images/image7.png'
import clothe8 from '../assets/images/image8.png'
// import bag category
import bag1 from '../assets/images/bag1.png'
import bag2 from '../assets/images/bag2.png'
import bag3 from '../assets/images/bag3.png'
import bag4 from '../assets/images/bag4.png'
import bag5 from '../assets/images/bag5.png'
import bag6 from '../assets/images/bag6.png'
import bag7 from '../assets/images/bag7.png'
import bag8 from '../assets/images/bag8.png'
// import shoes category
import shoe1 from '../assets/images/shoe1.png'
import shoe2 from '../assets/images/shoe2.png'
import shoe3 from '../assets/images/shoe3.png'
import shoe4 from '../assets/images/shoe4.png'
import shoe5 from '../assets/images/shoe5.png'
import shoe6 from '../assets/images/shoe6.png'
import shoe7 from '../assets/images/shoe7.png'
import shoe8 from '../assets/images/shoe8.png'
// import jewelries category
import jew1 from '../assets/images/jew1.png'
import jew2 from '../assets/images/jew2.png'
import jew3 from '../assets/images/jew3.png'
import jew4 from '../assets/images/jew4.png'
import jew5 from '../assets/images/jew5.png'
import jew6 from '../assets/images/jew6.png'
import jew7 from '../assets/images/jew7.png'
import jew8 from '../assets/images/jew8.png'

// import access category
import access1 from '../assets/images/access1.png'
import access2 from '../assets/images/access2.png'
import access3 from '../assets/images/access3.png'
import access4 from '../assets/images/access4.png'
import access5 from '../assets/images/access5.png'
import access6 from '../assets/images/access6.png'
import access7 from '../assets/images/access7.png'
import access8 from '../assets/images/access8.png'

// import beauty category
import beauty1 from '../assets/images/beauty1.png'
import beauty2 from '../assets/images/beauty2.png'
import beauty3 from '../assets/images/beauty3.png'
import beauty4 from '../assets/images/beauty4.png'
import beauty5 from '../assets/images/beauty5.png'
import beauty6 from '../assets/images/beauty6.png'
import beauty7 from '../assets/images/beauty7.png'
import beauty8 from '../assets/images/beauty8.png'
// Sample product data for each category
const productsByCategory = {
  Clothes: [
    {
        id: 1,
        image: clothe1,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
      },
      {
        id: 2,
        image: clothe2,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
      },
      {
          id: 3,
          image: clothe3,
          price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
      },
      {
          id: 4,
          image: clothe4,
          price: "₦28,000",
          discountedPrice: "₦28,000", // Discounted price
          description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
          rating: 4.8, // Star rating out of 5
      },
      {
          id: 5,
          image: clothe5,
          price: "₦28,000",
          discountedPrice: "₦28,000", // Discounted price
          description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
          rating: 4.8, // Star rating out of 5
      },
      {
          id: 6,
          image: clothe6,
          price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
      },
      {
          id: 7,
          image: clothe7,
          price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
      },
      {
          id: 8,
          image: clothe8,
          price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
      },
  ],
  Bags: [
    {
        id: 1,
        image: bag1,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 2,
        image: bag2,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 3,
        image: bag3,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 4,
        image: bag4,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 5,
        image: bag5,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 6,
        image: bag6,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 7,
        image: bag7,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 8,
        image: bag8,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    // Add up to 8 products for Bags
  ],
  Shoes: [
    {
        id: 1,
        image: shoe1,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
      id: 2,
      image: shoe2,
      price: "₦28,000",
      discountedPrice: "₦28,000", // Discounted price
      description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
      rating: 4.8, // Star rating out of 5
    },
    {
        id: 3,
        image: shoe3,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 4,
        image: shoe4,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 5,
        image: shoe5,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 6,
        image: shoe6,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 7,
        image: shoe7,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 8,
        image: shoe8,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    // Add up to 8 products for Shoes
  ],
  Jewelries: [
    {
        id: 1,
        image: jew1,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 2,
        image: jew2,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 3,
        image: jew3,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 4,
        image: jew4,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 5,
        image: jew5,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 6,
        image: jew6,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 7,
        image: jew7,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 8,
        image: jew8,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    // Add up to 8 products for Bags
  ],
  Accessories: [
    {
        id: 1,
        image: access1,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 2,
        image: access2,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 3,
        image: access3,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 4,
        image: access4,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 5,
        image: access5,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 6,
        image: access6,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 7,
        image: access7,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 8,
        image: access8,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
],
    // Add up to 8 products for Bags
  Beauty: [
    {
        id: 1,
        image: beauty1,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 2,
        image: beauty2,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 3,
        image: beauty3,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 4,
        image: beauty4,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 5,
        image: beauty5,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 6,
        image: beauty6,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 7,
        image: beauty7,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    {
        id: 8,
        image: beauty8,
        price: "₦28,000",
        discountedPrice: "₦28,000", // Discounted price
        description: "Nicole & Doris Fashion Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
        rating: 4.8, // Star rating out of 5
    },
    // Add up to 8 products for Bags
  ],
  // Add more categories and products as needed
};

export default function ProductDisplay() {
  const [selectedCategory, setSelectedCategory] = useState("Clothes"); // Default selected category
  const [activeCategory, setActiveCategory] = useState("Clothes"); // Track active category for styling
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate(); // For navigation


  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };





  // Handle button click to update the selected category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category); // Update the active category
  };

   // Handle "View More" button click
   const handleViewMoreClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the detailed product page
  };


  // Get the products for the selected category
  const products = productsByCategory[selectedCategory];

  return (
    <div className="container mx-auto p-4">
      {/* Category Buttons */}
      <div className="select-category mb-16">
        <div className="select-category-button flex flex-wrap gap-2">
          {Object.keys(productsByCategory).map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              // Apply different styles based on active category
              style={{
                backgroundColor:
                  activeCategory === category ? "#E94E30" : "transparent",
                color: activeCategory === category ? "#FFFFFF" : "#000000",
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <Link to="/product-description/123">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((product) => (
         <Card
         key={product.id}
         className="cardDetails rounded-xl hover:shadow-xl transition-shadow duration-300 hover:bg-[#f3f3f3] bg-white"
       >
         <CardHeader>
           <h2 className="text-xl font-bold">{product.name}</h2>
         </CardHeader>
       
         <CardContent>
           <div className="relative">
             <img
               src={product.image}
               alt={product.name}
               className="object-cover mb-4 rounded-lg w-full h-48"
             />
       
             <button
               onClick={() => toggleFavorite(product.id)}
               className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors mr-2"
             >
               <Heart
                 className={`h-5 w-5 ${
                   favorites.has(product.id)
                     ? "stroke-[#E94E30] fill-[#E94E30]"
                     : "stroke-[#E94E30]"
                 }`}
               />
             </button>
           </div>
       
           {/* Star Rating */}
           <div className="priceRating">
             <p className="text-gray-600 product-description px-2">{product.description}</p>
             <div className="flex items-center gap-1 mb-2 px-2">
               {[...Array(1)].map((_, index) => (
                 <Star
                   key={index}
                   className={`h-4 w-4 ${
                     index < Math.floor(product.rating)
                       ? "fill-yellow-400 stroke-yellow-400"
                       : "fill-gray-300 stroke-gray-300"
                   }`}
                 />
               ))}
               <span className="text-sm text-gray-600">({product.rating})</span>
             </div>
           </div>
       
           {/* Price and Add to Cart */}
           <div className="flex items-center justify-between px-2 h-[60px]">
             <div className="flex items-center gap-2">
               <span className="text-lg font-semibold text-black-600">
                 {product.discountedPrice}
               </span>
               <span className="text-sm text-gray-500 line-through">
                 {product.price}
               </span>
             </div>
               <Button id="add-to-cart" className="hover:shadow-md">
                 Add to Cart
               </Button>
           </div>
         </CardContent>
       </Card>
        ))}
      </div>
       </Link>
      <Button className='view-more'>View More</Button>
    </div>
  );
};