import React, { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const CATEGORIES = ["Clothes", "Bags", "Shoes", "Jewelry", "Accessories", "Beauty"];
const BRANDS = ["Nike", "Adidas", "Gucci", "Louis Vuitton", "Zara", "H&M"];
const COLORS = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const RATINGS = [1, 2, 3, 4, 5]; // Star ratings from 1 to 5

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Single category selection
  const [selectedBrand, setSelectedBrand] = useState(null); // Single brand selection
  const [selectedColors, setSelectedColors] = useState([]); // Multiple color selection
  const [selectedSizes, setSelectedSizes] = useState([]); // Multiple size selection
  const [selectedRating, setSelectedRating] = useState(null); // Single rating selection
  const [sortBy, setSortBy] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [priceRange, setPriceRange] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for collapsible sections
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
  useEffect(() => {
    // Fetch only the "Clothes" category from the API
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((data) => {
        // Transform the products to include additional properties
        const categorizedProducts = data.map((product, index) => ({
          id: product.id,
          image: product.image,
          title: product.title,
          rating: Math.round(product.rating.rate), // Round the rating to the nearest integer
          description: product.description,
          price: product.price,
          discount: product.discount || "10% off", // Fallback for missing discount
          brand: BRANDS[index % BRANDS.length], // Use index to assign a brand
          color: COLORS[index % COLORS.length], // Use index to assign a color
          size: SIZES[index % SIZES.length], // Use index to assign a size
        }));
        setProducts(categorizedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterProducts(selectedCategory, selectedBrand, selectedColors, selectedSizes, selectedRating, priceRange);
  }, [selectedCategory, selectedBrand, selectedColors, selectedSizes, selectedRating, priceRange, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand((prevBrand) => (prevBrand === brand ? null : brand));
  };

  const handleColorChange = (color) => {
    let updatedColors = [...selectedColors];
    if (updatedColors.includes(color)) {
      updatedColors = updatedColors.filter((c) => c !== color); // Unselect color
    } else {
      updatedColors.push(color); // Select color
    }
    setSelectedColors(updatedColors);
  };

  const handleSizeChange = (size) => {
    let updatedSizes = [...selectedSizes];
    if (updatedSizes.includes(size)) {
      updatedSizes = updatedSizes.filter((s) => s !== size); // Unselect size
    } else {
      updatedSizes.push(size); // Select size
    }
    setSelectedSizes(updatedSizes);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating((prevRating) => (prevRating === rating ? null : rating)); // Toggle rating selection
  };

  const filterProducts = (category, brand, colors, sizes, rating, price) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }
    if (colors.length > 0) {
      filtered = filtered.filter((product) => colors.includes(product.color));
    }
    if (sizes.length > 0) {
      filtered = filtered.filter((product) => sizes.includes(product.size));
    }
    if (rating) {
      filtered = filtered.filter((product) => product.rating === rating); // Filter by selected rating
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

  return <>
    <div className="container">
    <div className="p-6 flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 border-r">
        {/* Categories Section */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <h2 className="font-bold">Categories</h2>
            {isCategoriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isCategoriesOpen && (
            <div className="mt-2">
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
            </div>
          )}
        </div>

         {/* Brand Section */}
         <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsBrandOpen(!isBrandOpen)}
          >
            <h2 className="font-bold">Brand</h2>
            {isBrandOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isBrandOpen && (
            <div className="mt-2">
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
            </div>
          )}
        </div>

          {/* Price Range Section */}
          <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
          >
            <h2 className="font-bold">Price Range</h2>
            {isPriceRangeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isPriceRangeOpen && (
            <div className="mt-2">
              <input
                type="range"
                min="0"
                max=""
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
                aria-label="Price range slider"
              />
              <p className="text-gray-600">Up to ₦{priceRange}</p>
            </div>
          )}
        </div>


        {/* Size Section */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsSizeOpen(!isSizeOpen)}
          >
            <h2 className="font-bold">Size</h2>
            {isSizeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isSizeOpen && (
            <div className="mt-2">
              {SIZES.map((size) => (
                <div key={size} className="mb-2">
                  <input
                    type="checkbox"
                    id={size}
                    className="mr-2"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    aria-label={`Select ${size}`}
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Color Section */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsColorOpen(!isColorOpen)}
          >
            <h2 className="font-bold">Color</h2>
            {isColorOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isColorOpen && (
            <div className="mt-2">
              {COLORS.map((color) => (
                <div key={color} className="mb-2">
                  <input
                    type="checkbox"
                    id={color}
                    className="mr-2"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    aria-label={`Select ${color}`}
                  />
                  <label htmlFor={color}>{color}</label>
                </div>
              ))}
            </div>
          )}
        </div>

          {/* Rating Section */}
          <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsRatingOpen(!isRatingOpen)}
          >
            <h2 className="font-bold">Rating</h2>
            {isRatingOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
          {isRatingOpen && (
            <div className="mt-2 flex flex-row gap-4">
              {RATINGS.map((rating) => (
                <div
                  key={rating}
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => handleRatingChange(rating)}
                >
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    className="hidden"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    aria-label={`Select ${rating} star rating`}
                  />
                  <div className="flex items-center">
                    <Star
                      className={`h-4 w-4 ${selectedRating === rating ? "text-orange-500" : "text-gray-400"}`}
                      fill={selectedRating === rating ? "currentColor" : "none"}
                    />
                    <span className="ml-1">{rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>


      {/* Products Section */}
      <div className="w-3/4">
        <h1 className="font-bold mb-4">Clothes</h1>
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
                        className={`h-4 w-4 ${index < product.rating ? "text-orange-500" : "text-gray-400"}`}
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
    </div>
  </>
};

export default ProductsPage;