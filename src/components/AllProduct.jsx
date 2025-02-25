import React, { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

const CATEGORIES = ["Clothes", "Bags", "Shoes", "Jewelry", "Accessories", "Beauty"];
const BRANDS = ["Nike", "Adidas", "Gucci", "Louis Vuitton", "Zara", "H&M"];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Single category selection
  const [selectedBrand, setSelectedBrand] = useState(null); // Single brand selection
  const [sortBy, setSortBy] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const categorizedProducts = data.map((product, index) => ({
          id: product.id,
          image: product.image,
          title: product.title,
          rating: Math.round(product.rating.rate),
          description: product.description,
          price: product.price,
          discount: product.discount || "10% off",
          category: CATEGORIES[index % CATEGORIES.length],
          brand: BRANDS[index % BRANDS.length],
        }));
        setProducts(categorizedProducts);
        setFilteredProducts(categorizedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterProducts(selectedCategory, selectedBrand, priceRange);
  }, [selectedCategory, selectedBrand, priceRange, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand((prevBrand) => (prevBrand === brand ? null : brand));
  };

  const filterProducts = (category, brand, price) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }
    filtered = filtered.filter((product) => product.price <= price);
    setFilteredProducts(filtered);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return value === "price_asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r">
        <h2 className="font-bold mb-3">Categories</h2>
        {CATEGORIES.map((category) => (
          <div key={category} className="mb-2">
            <input
              type="checkbox"
              id={category}
              className="mr-2"
              checked={selectedCategory === category}
              onChange={() => handleCategoryChange(category)}
              aria-label={`Select ${category}`}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
        
        <h2 className="font-bold mt-4 mb-3">Brand</h2>
        <input
          type="text"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Search brand"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          aria-label="Search brand"
        />
        {BRANDS.filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase())).map((brand) => (
          <div key={brand} className="mb-2">
            <input
              type="checkbox"
              id={brand}
              className="mr-2"
              checked={selectedBrand === brand}
              onChange={() => handleBrandChange(brand)}
              aria-label={`Select ${brand}`}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}

        {/* Price Range Slider */}
        <h2 className="font-bold mt-4 mb-3">Price Range</h2>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
          aria-label="Price range slider"
        />
        <p className="text-gray-600">Up to ₦{priceRange}</p>
      </div>

      {/* Products Section */}
      <div className="w-3/4">
        <h1 className="font-bold mb-4">Our Products</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} results
          </p>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <CardHeader>
                <img src={product.image} alt={product.title} className="object-cover rounded-t-lg" />
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