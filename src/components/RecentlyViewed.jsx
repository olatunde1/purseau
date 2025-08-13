import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import Recent1 from "../assets/images/recent1.png";
import Recent2 from "../assets/images/recent2.png";
import Recent3 from "../assets/images/recent3.png";
import Recent4 from "../assets/images/recent4.png";

import sampleimage from "@/assets/images/sampleimage.jpg";
import { MdArrowForwardIos } from "react-icons/md";
import useGetRecentlyViewedProduct from "@/hooks/api/queries/product/useGetRecentlyViewedProduct";
import { calculateReviewStats } from "@/utils";

// const recentlyViewedItems = [
//   {
//     id: 1,
//     image: Recent1,
//     title: "Product 1",
//     rating: 4,
//     description: "This is a description for Product 1.",
//     price: 28000,
//     discount: "20% off",
//   },
//   {
//     id: 2,
//     image: Recent2,
//     title: "Product 2",
//     rating: 5,
//     description: "This is a description for Product 2.",
//     price: 28000,
//     discount: "15% off",
//   },
//   {
//     id: 3,
//     image: Recent3,
//     title: "Product 3",
//     rating: 3,
//     description: "This is a description for Product 3.",
//     price: 28000,
//     discount: "10% off",
//   },
//   {
//     id: 4,
//     image: Recent4,
//     title: "Product 4",
//     rating: 4,
//     description: "This is a description for Product 4.",
//     price: 28000,
//     discount: "5% off",
//   },
// ];

const RecentlyViewed = () => {
  const [favorites, setFavorites] = useState(new Set());

  const { data: recentlyViewedProduct } = useGetRecentlyViewedProduct();
  console.log(recentlyViewedProduct, "recently viewed data");

  const recentlyViewedProductData = recentlyViewedProduct?.data?.result ?? [];

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

  const { averageRating } = calculateReviewStats(
    recentlyViewedProductData?.reviews || []
  );

  return (
    <>
      {recentlyViewedProductData && recentlyViewedProductData?.length > 0 && (
        <div className="flex flex-col items-center p-16 recently-view ">
          {/* Header Section */}
          <div className="w-[1200px] flex justify-between items-center mb-2 ">
            <h2 className="text-lg font-semibold">Recently Viewed</h2>
            <Button variant="link" className="text-[#E94E30] flex items-center">
              See All <MdArrowForwardIos />
            </Button>
          </div>

          {/* Cards Section - Responsive Grid */}
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full recently-viewed-card ">
            {recentlyViewedProductData.map((item) => (
              <Card
                key={item._id}
                className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden all-product-card relative"
              >
                <CardHeader>
                  <div className="h-[280px] w-full">
                    <img
                      src={item.images[0]?.url || sampleimage}
                      alt={item.name}
                      className="object-contain h-full w-full rounded-t-lg "
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = sampleimage;
                      }}
                    />
                  </div>
                  <button
                    onClick={() => toggleFavorite(item._id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(item._id)
                          ? "fill-red-500 stroke-red-500"
                          : "stroke-gray-400"
                      }`}
                    />
                  </button>
                </CardHeader>
                <CardContent className="p-4">
                  {/* Title & Rating in a single row */}
                  <CardTitle className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.round(averageRating)
                              ? "text-orange-500"
                              : "text-gray-400"
                          }`}
                          fill={
                            index < Math.round(averageRating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {item?.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    ₦{item?.pricing?.perQuantity?.onePiece}
                  </span>
                  <span className="text-sm text-red-600">
                    {item.pricing?.percentageDiscount}% off
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyViewed;
