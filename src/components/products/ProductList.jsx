import ProductCard from "./ProductCard";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
    <div className="w-full">
      <h1 className="font-bold mb-4 ">Our Products</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {products.length} of {totalCount} results
        </p>
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                sortBy
                  ? sortBy === "price_asc"
                    ? "Price: Low to High"
                    : "Price: High to Low"
                  : "Sort By"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
