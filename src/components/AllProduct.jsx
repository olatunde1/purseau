import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import AllProductList from '../components/AllProductList'

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState(AllProductList);

  const handleSortChange = (value) => {
    setSortBy(value);
    const sortedProducts = [...products].sort((a, b) => {
      if (value === "price_asc") return a.price - b.price;
      if (value === "price_desc") return b.price - a.price;
      if (value === "rating_asc") return a.rating - b.rating;
      if (value === "rating_desc") return b.rating - a.rating;
      return 0;
    });
    setProducts(sortedProducts);
  };

  return (
    <div className="p-6 flex">
      {/* Products Section */}
      <div className="our-products">
        <h1 className="font-bold mb-4 our-product-text">Our Products</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {products.length} of {AllProductList.length} results
          </p>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
              <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden all-product-card">
              <CardHeader>
                <img src={product.image} alt={product.title} className=" object-cover rounded-t-lg all-product-image " />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="flex justify-between items-center">
                  <span>{product.title}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < product.rating ? "text-yellow-500" : "text-gray-300"}`}
                        fill={index < product.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </CardTitle>
                <CardDescription className="mt-2">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center">
                <span className="text-lg font-semibold">₦{product.price.toFixed(2)}</span>
                <span className="text-sm text-red-600">{product.discount}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;