import React, { useState } from "react";
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

const ProductCategorySidebar = () => {
  // State for selected categories and brands
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range

  // Sample data for categories and brands
  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Sports", "Books"];
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];

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

  // Handle price range change
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  // Handle unselect all
  const handleUnselectAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="w-64 p-4 bg-white shadow-md rounded-lg">
      {/* Search Input */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full"
        />
      </div>

      {/* Categories Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
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
      </Accordion>

      {/* Brands Accordion */}
      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="brand">
          <AccordionTrigger className="font-semibold">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
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
      </Accordion>

      {/* Price Range Slider */}
      <div className="mt-6">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={1000}
          step={10}
          onValueChange={handlePriceRangeChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Unselect All Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleUnselectAll}
        >
          Unselect All
        </Button>
      </div>
    </div>
  );
};

export default ProductCategorySidebar;