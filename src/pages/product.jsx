import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Import shadcn/ui Accordion
import { Checkbox } from "@/components/ui/checkbox"; // Import shadcn/ui Checkbox
import { Input } from "@/components/ui/input"; // Import shadcn/ui Input
import { Slider } from "@/components/ui/slider"; // Import shadcn/ui Slider
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
import AllProduct from "../components/AllProduct"
import Pagination from "../components/Pagination"
import { StayLoop } from "@/components/StayLoop";
import RecentlyViewed from "@/components/RecentlyViewed";

// Import necessary icons or use Unicode stars
const StarIcon = () => <span>⭐</span>; // Unicode star icon

const ProductCategorySidebar = () => {

  const handleAccordionToggle = (value) => {
    setActiveAccordion(activeAccordion === value ? null : value);
  };

  // State for selected categories and brands
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0); // Selected rating (0 means no rating)
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Sample data for categories and brands
  const categories = ["Clothes", "Bags", "Shoes", "Jewelry", "Accessories","Beauty"];
  const brands = ["Adidas", "Alexander McQueen", "Armani", "Balenciaga", "Burberry","Channel","Dior"];
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];


  // Handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle brand selection
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Handle color selection
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

   // Handle rating selection by clicking on stars
   const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  // Handle price range change
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  // Handle unselect all
  const handleUnselectAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedRating(0);
    setPriceRange([0, 1000]);
  };

  return <> 
  <div className="products-container flex">
      
    <div className=" p-4 bg-white shadow-md rounded-lg product-category">
      <Accordion type="single" collapsible  value={activeAccordion} onValueChange={handleAccordionToggle}>
        {/* Categories Accordion */}
        <AccordionItem value="category">
        <AccordionTrigger className={`font-semibold ${activeAccordion === "category" ? "bg-[#E94E30] text-white" : "bg-white"} category`}
          >
            CATEGORY
            </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                  className="check-bo"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
    

      {/* Brands Accordion */}
    
        <AccordionItem value="brand">
          <AccordionTrigger className={`font-semibold ${activeAccordion === "brand" ? "bg-[#E94E30] text-white" : "bg-white"} category`}
          >
            BRAND
            </AccordionTrigger>
            {/* Search Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full"
          />
        </div>
          <AccordionContent>
            <div className="space-y-2">
              {/* Unselect All Button */}
                <div className="mt-2">
                  <Button
                    variant="none"
                    className="w-full"
                    onClick={handleUnselectAll}
                  >
                    Unselect All
                  </Button>
                </div>
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={brand} className="text-sm">
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>


      {/* Price Range Slider */}
      <div className="mt-6">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={1000}
          step={10}
          onValueChange={handlePriceRangeChange}
          className="w-full [&>div]:bg-[#E94E30] [&>div]:border-[#E94E30]"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      
        {/* Size Accordion */}
    
        <AccordionItem value="size" className="mt-6">
        <AccordionTrigger className={`font-semibold ${activeAccordion === "size" ? "bg-[#E94E30] text-white" : "bg-white"} category`}
          >
            SIZE
            </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() => handleSizeChange(size)}
                  />
                  <label htmlFor={size} className="text-sm">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

      
        {/* Color Accordion */}
      
        <AccordionItem value="color">
        <AccordionTrigger className={`font-semibold ${activeAccordion === "color" ? "bg-[#E94E30] text-white" : "bg-white"} category`}
          >
            COLOR
            </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={color}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                  />
                  <label htmlFor={color} className="text-sm">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>


        {/* Rating Accordion */}
      
        <AccordionItem value="rating">
          <AccordionTrigger className="font-semibold">RATING</AccordionTrigger>
          <AccordionContent>
            <div className="flex space-x-1"> {/* Display stars and numbers in a row */}
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <button
                    onClick={() => handleRatingClick(rating)}
                    className={`text-2xl ${selectedRating >= rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <FaStar />
                  </button>
                  <span className="text-sm">{rating}</span> {/* Display number */}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    {/* Sidebar */}
    <div className=""> 
      <AllProduct />
    </div>
  </div>

  <div className="pagination-page p-10">
    <Pagination totalPages={5} />
  </div>

  <div className="recently-viewed">
    <RecentlyViewed />
  </div>
  
  <div className="stay-loop">
    <StayLoop />
  </div>
  
  </>
};

export default ProductCategorySidebar;