import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import Recent1 from '../assets/images/recent1.png'
import Recent2 from '../assets/images/recent2.png'
import Recent3 from '../assets/images/recent3.png'
import Recent4 from '../assets/images/recent4.png'
import { MdArrowForwardIos } from "react-icons/md";

const ExploreSimilarProductsItems = [
  {
    id: 1,
    image: Recent1,
    title: "Product 1",
    rating: 4,
    description: "This is a description for Product 1.",
    price: 28000,
    discount: "20% off",
  },
  {
    id: 2,
    image: Recent2,
    title: "Product 2",
    rating: 5,
    description: "This is a description for Product 2.",
    price: 28000,
    discount: "15% off",
  },
  {
    id: 3,
    image: Recent3,
    title: "Product 3",
    rating: 3,
    description: "This is a description for Product 3.",
    price: 28000,
    discount: "10% off",
  },
  {
    id: 4,
    image: Recent4,
    title: "Product 4",
    rating: 4,
    description: "This is a description for Product 4.",
    price: 28000,
    discount: "5% off",
  },
];

const ExploreSimilarProduct = () => {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="flex flex-col items-center ">
      {/* Header Section */}
      <div className="w-[1200px] flex justify-between items-center ">
        <h2 className="text-4xl font-bold font-custom2">Explore Similar Products</h2>
        <Button variant="link" className="text-[#E94E30] flex items-center text-base font-semibold">
          See All <MdArrowForwardIos />
        </Button>
      </div>

      {/* Cards Section - Responsive Grid */}
      <div className="flex gap-6 flex-wrap justify-center w-full">
        {ExploreSimilarProductsItems.map((item) => (
          <Card key={item.id} className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden relative">
            <CardHeader>
              <img src={item.image} alt={item.title} className="object-cover rounded-t-lg md:w-[100%] w-full" />
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.has(item.id)
                      ? "fill-red-500 stroke-red-500"
                      : "stroke-gray-400"
                  }`}
                />
              </button>
            </CardHeader>
            <CardContent className="p-4">
              {/* Title & Rating in a single row */}
              <div className="flex justify-between items-center">
                <span>{item.title}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  <span className="text-sm font-medium text-gray-600">{item.rating.toFixed(1)}</span>
                </div>
              </div>
              <CardDescription className="mt-2">{item.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <span className="text-lg font-semibold">₦{item.price.toFixed(2)}</span>
              <span className="text-sm text-red-600">{item.discount}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreSimilarProduct;
