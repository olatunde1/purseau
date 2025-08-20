import React, { useState } from "react";
import { Edit, Star } from "lucide-react";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const productImages = [
    "https://via.placeholder.com/500x500?text=Main+Image",
    "https://via.placeholder.com/150x150?text=Image+2",
    "https://via.placeholder.com/150x150?text=Image+3",
    "https://via.placeholder.com/150x150?text=Image+4",
  ];
  const [mainImage, setMainImage] = useState(productImages[0]);
  // At the top of your component
const [selectedColor, setSelectedColor] = useState("#E94E30");
const [selectedSize, setSelectedSize] = useState("EU 38");

const colorOptions = [
  { hex: "#5FB979", name: "Green" },
  { hex: "#EF6682", name: "Orange" },
  { hex: "#C9B650", name: "Gold" },
  { hex: "#DBBFB4", name: "nude" },
];

const sizeOptions = [
  "EU 34-35",
  "EU 35",
  "EU 35-36",
  "EU 37",
  "EU 37-38",
  "EU 38",
  "EU 39-40",
  "EU 40",
  "EU 40-41",
  "EU 42",
  "EU 42-43",
];

  const reviews = [
  {
    name: "John Doe",
    rating: 4,
    text: "Great quality, the material feels premium and delivery was fast!",
    images: [
      "https://via.placeholder.com/120x120.png?text=Item+1",
      "https://via.placeholder.com/120x120.png?text=Item+2",
    ],
    date: "Aug 18, 2025",
  },
  {
    name: "Jane Smith",
    rating: 5,
    text: "Absolutely love this product! Exceeded my expectations.",
    images: [
      "https://via.placeholder.com/120x120.png?text=Item+A",
      "https://via.placeholder.com/120x120.png?text=Item+B",
    ],
    date: "Aug 15, 2025",
  },
];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Product Details</h1>
      
      </div>

      {/* Main Layout */}
      <div className="flex w-full md:w-[1092px] ">
        {/* Image Gallery */}
      <div className="w-full md:w-[320px] ">
  <div className="border rounded-xl overflow-hidden">
    <img
      src={mainImage}
      alt="Main Product"
      className="w-full h-72 sm:h-96 object-cover"
    />
  </div>

  {/* Thumbnails */}
  <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
    {productImages.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`Thumbnail ${idx + 1}`}
        className={`w-20 h-20 object-cover rounded-lg border cursor-pointer flex-shrink-0 ${
          mainImage === img ? "ring-2 ring-orange-500" : ""
        }`}
        onClick={() => setMainImage(img)}
      />
    ))}
  </div>

  {/* Available Colors */}
<div className="mt-6">
  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
    Available Color
  </h3>

  <div className="mt-3 flex items-center gap-3">
    {colorOptions.map((c) => (
      <button
        key={c.hex}
        type="button"
        onClick={() => setSelectedColor(c.hex)}
        aria-label={`Select color ${c.name}`}
        className={`h-9 w-9 rounded-full border shadow-sm transition-transform hover:scale-105 
          ${selectedColor === c.hex ? "ring-2 ring-offset-2 ring-gray-900" : ""}`}
        style={{ backgroundColor: c.hex }}
      />
    ))}
  </div>

  {/* Selected color label */}
  <p className="mt-2 text-xs text-gray-500">
    Selected:{" "}
    <span className="font-medium">
      {colorOptions.find((c) => c.hex === selectedColor)?.name}
    </span>
  </p>

  <input type="hidden" name="color" value={selectedColor} />
</div>

{/* Available Sizes */}
<div className="mt-6">
  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
    Available Sizes
  </h3>

  <div className="mt-3 flex flex-wrap gap-2">
    {sizeOptions.map((size) => (
      <button
        key={size}
        type="button"
        onClick={() => setSelectedSize(size)}
        className={`px-3 py-1 rounded-lg border text-sm sm:text-base cursor-pointer transition 
          ${selectedSize === size 
            ? "ring-2 ring-offset-1 ring-orange-500 border-orange-500 font-medium" 
            : "hover:border-gray-400"
          }`}
      >
        {size}
      </button>
    ))}
  </div>

  {/* Selected size label */}
  <p className="mt-2 text-xs text-gray-500">
    Selected: <span className="font-medium">{selectedSize}</span>
  </p>

  <input type="hidden" name="size" value={selectedSize} />
</div>

</div>


        {/* Product Info */}
        <div className="ml-4 w-full md:w-[708px]">
          <div className="flex justify-between">
            <div>
            <h2 className="text-lg sm:text-[20px] lg:text-[28px] font-bold mb-1">
            Caramew - CHL Bags - 370
            </h2>
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#F2F2F7] text-[#1B121B] px-4 rounded-lg shadow  w-full sm:w-auto">
          <Edit size={16} /> Edit
          </button>
          </div>
            <p className="text-sm text-gray-500 mb-4">
            Product ID: DS-PS01ID92
          </p>
          <h3 className="font-bold text-[20px] pb-6">Product Summary</h3>
          <p className="mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Pricing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 mt-4">
            <div>
              <p className="font-bold text-[32px]">₦ 48,000</p>
              <p className="text-gray-400 line-through ">₦ 48,000</p>
              <p className="text-gray-500 text-xs sm:text-sm">1 piece</p>
            </div>
            <div>
              <p className="font-bold text-2xl pt-2 text-[#5B5B5B]">₦ 46,820</p>
              <p className="text-gray-400 line-through text-sm pt-3">₦ 46,820</p>
              <p className="text-gray-500 text-xs sm:text-sm">3-12 pieces</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-[#5B5B5B] pt-2">₦ 45,000</p>
              <p className="text-gray-400 line-through text-sm pt-3">₦ 45,000</p>
              <p className="text-gray-500 text-xs sm:text-sm">13 upward</p>
            </div>
            <div className="text-red-500 font-semibold text-sm sm:text-base mt-2 flex bg-[#FFE4DA] w-[45px] h-[32px] text-center items-center justify-center">
              -23%
            </div>
          </div>

               <div className="bg-white grid grid-cols-3 mt-6 border rounded-xl shadow h-[88px]">
                <div className="p-3  sm:p-4  border-r border-gray-200 first:rounded-l-xl">
                  <p className="text-lg sm:text-2xl font-bold">251</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Orders</p>
                </div>
                <div className="p-3 sm:p-4 border-r border-gray-200">
                  <p className="text-lg sm:text-2xl font-bold">214</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Available Stocks</p>
                </div>
                <div className="p-3 sm:p-4 ">
                  <p className="text-lg sm:text-2xl font-bold">₦ 1.563,800</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Total Revenue</p>
                </div>
                </div>
                <h1 className="font-bold text-[20px] pt-6">Product Description</h1>
                <p className="text-justify py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Lorem Ipsum is dummy text used throughout the design industry. Lorem Ipsum has been the standard dummy text for many hundreds of years. Ever since an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five View more</p>
                
                <h1 className="font-bold text-[20px] pt-4">Additional Information</h1>
                <table className="mt-6 w-full border rounded-xl bg-white shadow">
                <thead>
                  <tr className="">
                  <th scope="col" className="px-4 py-5 text-left font-semibold text-gray-700">
                    Brand
                  </th>
                  <th scope="col" className="px-4 py-5 text-left font-semibold text-gray-700">
                    Channel
                  </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#F8F8F8]">
                  <td className="px-4 py-5 text-gray-600">Weight</td>
                  <td className="px-4 py-5 text-gray-600">80kg</td>
                  </tr>
                  <tr>
                  <td className="px-4 py-5 text-gray-600">Material</td>
                  <td className="px-4 py-5 text-gray-600">PU Leather</td>
                  </tr>
                </tbody>
                </table>

                <h1 className="font-bold text-[20px] pt-6">Ratings & Review</h1>
                <div className="flex space-x-4 mt-2">
                  <div className="left w-full md:w-[339px]">
                    <div className="flex items-center gap-2 mt-4">
                <span className="text-xl sm:text-2xl font-bold bg-[#FFE4DA] py-6 px-[23px] rounded-md text-[#E94E30]">4.8</span>
                <div className="grid space-y-3">
                  <span className="flex items-center gap-1">
                     {/* 5 stars, 4 active */}
                {[...Array(5)].map((_, i) => (
                  <Star
                  key={i}
                  className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  size={20}
                  />
                ))}
                  </span>
                  <span className="text-gray-500 text-sm">Based on 578 ratings</span>
                </div>
               

                </div>
                
                <div className="mt-6"></div>
                  {[
                    { stars: 5, percent: 80, count: 2436 },
                    { stars: 4, percent: 12, count: 456 },
                    { stars: 3, percent: 50, count: 150 },
                    { stars: 2, percent: 2, count: 60 },
                    { stars: 1, percent: 1, count: 30 },
                  ].map((rating, idx) => (
                    <div key={idx} className="flex items-center  mb-2">
                      <div className="flex items-center gap-1 w-16 font-semibold text-gray-700">
                        {rating.stars} Star{rating.stars > 1 ? "s" : ""}
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden mx-2">
                        <div
                          className="h-full w-full"
                          style={{
                            width: `${rating.percent}%`,
                            background: "#e94e30",
                            borderRadius: "inherit",
                          }}
                        />
                      </div>
                      <span className="text-gray-700 text-sm font-medium w-12 text-right">{rating.count}</span>
                    </div>
                  ))}
                  </div>
                  <div className="right w-full md:w-[313px]">
                    <div className="mt-4 space-y-3">
                      {reviews.map((review, idx) => (
                        <div key={idx} className="border p-2 rounded-lg shadow-sm bg-white">
                          {/* Name + Stars */}
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-800">{review.name}</span>
                            <div className="flex space-x-1 text-[#e94e30]">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  fill={i < review.rating ? "#E9BB02" : "none"}
                                  stroke="#E9BB02"
                                />
                              ))}
                            </div>
                          </div>

                          {/* Review Text */}
                          <p className="mt-2 text-gray-600 text-sm">{review.text}</p>

                          {/* Review Images */}
                          <div className="flex justify-between">
                            <div className="flex space-x-3 mt-3">
                            {review.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="Reviewed item"
                                className="w-24 md:w-[40px] h-24 md:h-[40px] rounded-lg object-cover"
                              />
                            ))}
                          </div>

                          {/* Date */}
                          <p className="mt-8 text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
        </div>
      </div>
            
    </div>

            
  );
};

export default ProductDetails;
