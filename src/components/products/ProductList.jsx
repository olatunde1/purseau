import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import ProductCard from "./ProductCard";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FilterSidebar from "./FilterSidebar";
import { Button } from "../ui/button";

const ProductList = ({ products, totalCount, sortBy, setSortBy }) => {
  if (!products || products.length === 0) {
    return (
      <div className="w-3/4">
        <h1 className="font-bold mb-4 ">Our Products</h1>
        <p className="text-gray-600">No products available.</p>
      </div>
    );
  }
  return (
    <div className="w-full px-2 lg:px-0">
      <h1 className="font-bold mb-4 text-3xl lg:text-4xl ">Our Products</h1>
      <div className="flex justify-between lg:items-center ">
        <p className="text-gray-600 ">
          Showing {products.length} of {totalCount} results
        </p>
        <div className="flex justify-between">
          <div className="md:invisible mb-4 flex absolute left-5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[60%]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto h-[80vh] pr-2">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
      <div className="flex space-x-2">
          <p className="w-full">Sort By :</p>
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue
              placeholder={
                sortBy
                  ? sortBy === "price_asc"
                    ? "Price: Low to High"
                    : "Price: High to Low"
                  : "New Arrivals"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
