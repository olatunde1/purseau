import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Star } from "lucide-react"; // For star icons (install lucide-react if not already installed)
import { useNavigate } from "react-router-dom"; // For navigation
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
  Accessories: [
    {
      id: 1,
      name: "Sneakers",
      image: "https://via.placeholder.com/150",
      price: "$89.99",
      description: "Comfortable and trendy sneakers.",
    },
    {
      id: 2,
      name: "Boots",
      image: "https://via.placeholder.com/150",
      price: "$109.99",
      description: "Stylish boots for any season.",
    },
    // Add up to 8 products for Shoes
  ],
  // Add more categories and products as needed
  Beauty: [
    {
      id: 1,
      name: "Sneakers",
      image: "https://via.placeholder.com/150",
      price: "$89.99",
      description: "Comfortable and trendy sneakers.",
    },
    {
      id: 2,
      name: "Boots",
      image: "https://via.placeholder.com/150",
      price: "$109.99",
      description: "Stylish boots for any season.",
    },
    // Add up to 8 products for Shoes
  ],
  // Add more categories and products as needed
};

export default function ProductDisplay() {
  const [selectedCategory, setSelectedCategory] = useState("Clothes"); // Default selected category

  const navigate = useNavigate(); // For navigation

  // Handle button click to update the selected category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Get the products for the selected category
  const products = productsByCategory[selectedCategory];

  return (
    <div className="container mx-auto p-4">
      {/* Category Buttons */}
      <div className="select-category">
        <div className="select-category-button flex flex-wrap gap-2">
          {Object.keys(productsByCategory).map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryClick(category)}
              variant={selectedCategory === category ? "default" : "outline"}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((product) => (
          <Card key={product.id} className="cardDetails hover:shadow-lg transition-shadow">
            <CardHeader>
              <h2 className="text-xl font-bold">{product.name}</h2>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className=" object-cover rounded-lg mb-4"
              />
              {/* Star Rating */}
              <div className="priceRating">
                <p className="text-gray-600 product-description">{product.description}</p>
                <div className="flex items-center gap-1 mb-2 product-description">
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
                    <span className="text-sm text-gray-600 ml-1">
                    ({product.rating})
                    </span>
                </div>
              </div>
              
              
             {/* Price and Discount */}
             <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-black-600">
                  {product.discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.price}
                </span>
                <span className="text-sm text-gray-500   ">
                  <Button id="add-to-cart" >Add to Cart</Button>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       
      <Button className='view-more'>View More</Button>
    </div>
  );
}