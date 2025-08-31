import { useState } from "react";
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Heart } from "lucide-react";
import Recent1 from '../assets/images/bag1.png'
import Recent2 from '../assets/images/bag2.png'
import Recent3 from '../assets/images/bag3.png'
import Recent4 from '../assets/images/bag4.png'
import { MdArrowForwardIos } from "react-icons/md";

const ExploreSimilarProductsItems = [
  {
    id: 1,
    image: Recent1,
    title: "Nicole & Doris Fashion",
    rating: 4,
    description: "Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
    price: 28000,
    // discount: "20% off",
  },
  {
    id: 2,
    image: Recent2,
    title: "Nicole & Doris Fashion",
    rating: 5,
    description: "Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
    price: 28000,
    // discount: "15% off",
  },
  {
    id: 3,
    image: Recent3,
    title: "Nicole & Doris Fashion",
    rating: 3,
    description: "Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
    price: 28000,
    // discount: "10% off",
  },
  {
    id: 4,
    image: Recent4,
    title: "Nicole & Doris Fashion",
    rating: 4,
    description: "Handvfjfjfjfjfjfjfjfjfnvnv nv vn",
    price: 28000,
    // discount: "5% off",
  },
];

const ExploreSimilarProducts = () => {
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
    <div className="flex flex-col items-center p-4 mt-20 ">
      {/* Header Section */}
      <div className="w-[1200px] flex justify-between items-center mb-2 ">
        <h2 className="text-4xl font-bold font-custom2">You Might Also Like</h2>
        <Button variant="link" className="text-[#E94E30] flex items-center font-custom font-semibold leading-6">
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
                  className="h-5 w-5"
                  style={{
                    fill: favorites.has(item.id) ? "red" : "transparent",
                    stroke: favorites.has(item.id) ? "red" : "gray",
                  }}
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

export default ExploreSimilarProducts;
