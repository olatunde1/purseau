import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import CheckboxFilter from "./CheckBoxFilter";
import { useProductStore } from "@/store/productStore";
import RatingFilter from "./RatingFilter";

const CATEGORIES = [
  "Clothes",
  "Bags",
  "Shoes",
  "Jewelries",
  "Accessories",
  "Beauties",
];

const BRANDS = ["Nike", "Adidas", "Gucci", "Louis Vuitton", "Zara", "H&M"];
const COLORS = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const FilterSidebar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
  const [brandSearch, setBrandSearch] = useState("");

  const {
    category,
    brand,
    colors,
    sizes,
    rating,
    maxPrice,
    setCategory,
    setBrand,
    toggleColor,
    toggleSize,
    setRating,
    setMaxPrice,
    resetFilters,
  } = useProductStore();

  const filteredBrands = BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  useEffect(() => {
    const handler = setTimeout(() => {
      setMaxPrice(tempMaxPrice);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [tempMaxPrice]);

  return (
    <div className="w-full p-4 border-r">

      <FilterSection
        title="Categories"
        isOpen={isCategoriesOpen}
        toggleOpen={() => setIsCategoriesOpen(!isCategoriesOpen)}
      >
        <CheckboxFilter
          items={CATEGORIES}
          selectedItems={category}
          onChange={setCategory}
          singleSelect={true}
        />
      </FilterSection>

      <FilterSection
        title="Brand"
        isOpen={isBrandOpen}
        toggleOpen={() => setIsBrandOpen(!isBrandOpen)}
      >
        <input
          type="text"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Search brand"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          aria-label="Search brand"
        />
        <CheckboxFilter
          items={filteredBrands}
          selectedItems={brand}
          onChange={setBrand}
          singleSelect={true}
        />
      </FilterSection>

      
      <FilterSection
        title="Price Range"
        isOpen={isPriceRangeOpen}
        toggleOpen={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
      >
        <div>
          <input
            type="range"
            min="0"
            max="1000000"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(Number(e.target.value))}
            className="w-full"
            aria-label="Price range slider"
          />
          <p className="text-gray-600">Up to ₦{tempMaxPrice?.toLocaleString()}</p>
        </div>
      </FilterSection>

      <FilterSection
        title="Size"
        isOpen={isSizeOpen}
        toggleOpen={() => setIsSizeOpen(!isSizeOpen)}
      >
        <CheckboxFilter
          items={SIZES}
          selectedItems={sizes}
          onChange={toggleSize}
        />
      </FilterSection>

      <FilterSection
        title="Color"
        isOpen={isColorOpen}
        toggleOpen={() => setIsColorOpen(!isColorOpen)}
      >
        <CheckboxFilter
          items={COLORS}
          selectedItems={colors}
          onChange={toggleColor}
        />
      </FilterSection>


      <FilterSection
        title="Rating"
        isOpen={isRatingOpen}
        toggleOpen={() => setIsRatingOpen(!isRatingOpen)}
      >
        <RatingFilter selectedRating={rating} onChange={setRating} />
      </FilterSection>



   
    </div>
  );
};

export default FilterSidebar;
