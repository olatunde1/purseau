import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Recent1 from '../assets/images/recent1.png'
import Recent2 from '../assets/images/recent2.png'
import Recent3 from '../assets/images/recent3.png'
import Recent4 from '../assets/images/recent4.png'

const recentlyViewedItems = [
  {
    id: 1,
    image: Recent1,
    title: "Product 1",
    rating: 4,
    description: "This is a description for Product 1.",
    price: 99.99,
    discount: "20% off",
  },
  {
    id: 2,
    image: Recent2,
    title: "Product 2",
    rating: 5,
    description: "This is a description for Product 2.",
    price: 129.99,
    discount: "15% off",
  },
  {
    id: 3,
    image: Recent3,
    title: "Product 3",
    rating: 3,
    description: "This is a description for Product 3.",
    price: 79.99,
    discount: "10% off",
  },
  {
    id: 4,
    image: Recent4,
    title: "Product 4",
    rating: 4,
    description: "This is a description for Product 4.",
    price: 89.99,
    discount: "5% off",
  },
];

const RecentlyViewed = () => {
  return (
    <div className="flex flex-col items-center p-4 recently-view">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center max-w-4xl mb-4">
        <h2 className="text-lg font-semibold">Recently Viewed</h2>
        <Button variant="link" className="text-blue-500 flex items-center">
          See All <span className="ml-1">→</span>
        </Button>
      </div>

      {/* Cards Section - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 recently-viewed-card">
        {recentlyViewedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden all-product-card">
            <CardHeader>
              <img src={item.image} alt={item.title} className="object-cover rounded-t-lg all-product-image" />
            </CardHeader>
            <CardContent className="p-4">
              {/* Title & Rating in a single row */}
              <CardTitle className="flex justify-between items-center">
                <span>{item.title}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${index < item.rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill={index < item.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </CardTitle>
              <CardDescription className="mt-2">{item.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
              <span className="text-sm text-red-600">{item.discount}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
