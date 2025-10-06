import { useState } from "react";
import { Edit, Star } from "lucide-react";

const ProductDetails = () => {
  const productImages = [
    "https://via.placeholder.com/500x500?text=Main+Image",
    "https://via.placeholder.com/150x150?text=Image+2",
    "https://via.placeholder.com/150x150?text=Image+3",
    "https://via.placeholder.com/150x150?text=Image+4",
  ];
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedColor, setSelectedColor] = useState("#E94E30");
  const [selectedSize, setSelectedSize] = useState("EU 38");

  const colorOptions = [
    { hex: "#5FB979", name: "Green" },
    { hex: "#EF6682", name: "Orange" },
    { hex: "#C9B650", name: "Gold" },
    { hex: "#DBBFB4", name: "Nude" },
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
        <h1 className="text-xl sm:text-2xl font-bold">  Product Details</h1>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1092px] mx-auto gap-6">
        {/* Left: Image & Options */}
        <div className="w-full lg:w-[320px]">
          {/* Main Image */}
          <div className="border rounded-xl overflow-hidden">
            <img
              src={mainImage}
              alt="Main Product"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 pl-1 pt-1 lg:px-2">
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

          {/* Colors */}
          <div className="mt-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              Available Color
            </h3>
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(c.hex)}
                  aria-label={`Select color ${c.name}`}
                  className="h-9 w-9 rounded-full border shadow-sm transition-transform hover:scale-105"
                  style={{
                    backgroundColor: c.hex,
                    boxShadow:
                      selectedColor === c.hex
                        ? `0 0 0 3px white, 0 0 0 6px ${c.hex}`
                        : undefined,
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected:{" "}
              <span className="font-medium">
                {colorOptions.find((c) => c.hex === selectedColor)?.name}
              </span>
            </p>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              Available Sizes
            </h3>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-full px-3 py-2 rounded-2xl border text-sm cursor-pointer bg-[#F2F2F7] transition ${
                    selectedSize === size
                      ? "ring-2 ring-offset-1 ring-orange-500 border-orange-500 font-medium"
                      : "hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Selected: <span className="font-medium">{selectedSize}</span>
            </p>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-[708px]">
          {/* Title + Edit */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
            <h2 className="text-lg sm:text-2xl font-semibold">
              Caramew - CHL Bags - 370
            </h2>
            <button className="flex items-center justify-center gap-2 bg-[#F2F2F7] text-[#1B121B] px-4 py-2 rounded-lg shadow text-sm sm:text-base w-full sm:w-auto">
              <Edit size={16} /> Edit
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Product ID: DS-PS01ID92
          </p>

          {/* Summary */}
          <h3 className="font-semibold text-lg pb-2">Product Summary</h3>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Pricing Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div>
              <p className="font-bold text-2xl sm:text-3xl">₦ 48,000</p>
              <p className="text-gray-400 line-through text-sm">₦ 48,000</p>
              <p className="text-gray-500 text-xs">1 piece</p>
            </div>
            <div>
              <p className="font-bold text-xl text-[#5B5B5B]">₦ 46,820</p>
              <p className="text-gray-400 line-through text-sm">₦ 46,820</p>
              <p className="text-gray-500 text-xs">3–12 pieces</p>
            </div>
            <div>
              <p className="font-bold text-xl text-[#5B5B5B]">₦ 45,000</p>
              <p className="text-gray-400 line-through text-sm">₦ 45,000</p>
              <p className="text-gray-500 text-xs">13+ pieces</p>
            </div>
            <div className="text-red-500 font-semibold text-sm bg-[#FFE4DA] w-fit px-3 py-1 rounded-md text-center">
              -23%
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white grid grid-cols-3 mt-6 border rounded-xl shadow overflow-hidden text-center">
            <div className="p-3 sm:p-4 border-r border-gray-200">
              <p className="text-lg sm:text-2xl font-bold">251</p>
              <p className="text-gray-500 text-xs sm:text-sm">Orders</p>
            </div>
            <div className="p-3 sm:p-4 border-r border-gray-200">
              <p className="text-lg sm:text-2xl font-bold">214</p>
              <p className="text-gray-500 text-xs sm:text-sm">Stocks</p>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-lg sm:text-2xl font-bold">₦ 1,563,800</p>
              <p className="text-gray-500 text-xs sm:text-sm">Revenue</p>
            </div>
          </div>

          {/* Description */}
          <h1 className="font-semibold text-lg sm:text-xl pt-6">
            Product Description
          </h1>
          <p className="text-justify py-3 text-gray-700 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum
            has been the standard dummy text for many hundreds of years.
          </p>

          {/* Additional Info */}
          <h1 className="font-semibold text-lg sm:text-xl pt-4">
            Additional Information
          </h1>
          <table className="mt-4 w-full border rounded-xl bg-white shadow text-sm sm:text-base">
            <tbody>
              <tr className="bg-[#F8F8F8]">
                <td className="px-4 py-3 text-gray-600 font-medium">Brand</td>
                <td className="px-4 py-3 text-gray-600">Caramew</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600 font-medium">
                  Material
                </td>
                <td className="px-4 py-3 text-gray-600">PU Leather</td>
              </tr>
              <tr className="bg-[#F8F8F8]">
                <td className="px-4 py-3 text-gray-600 font-medium">Weight</td>
                <td className="px-4 py-3 text-gray-600">80kg</td>
              </tr>
            </tbody>
          </table>

          {/* Ratings & Reviews */}
          <h1 className="font-semibold text-lg sm:text-xl pt-6">
            Ratings & Review
          </h1>
          <div className="flex flex-col md:flex-row gap-6 mt-3">
            {/* Rating Overview */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold bg-[#FFE4DA] py-3 px-4 rounded-md text-[#E94E30]">
                  4.8
                </span>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < 4
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">
                    Based on 578 ratings
                  </p>
                </div>
              </div>

              {/* Rating Bars */}
              <div className="mt-4 space-y-2">
                {[
                  { stars: 5, percent: 80, count: 2436 },
                  { stars: 4, percent: 12, count: 456 },
                  { stars: 3, percent: 5, count: 150 },
                  { stars: 2, percent: 2, count: 60 },
                  { stars: 1, percent: 1, count: 30 },
                ].map((r, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="w-12 text-sm font-medium">{r.stars}★</span>
                    <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                      <div
                        className="bg-[#E94E30] h-2 rounded"
                        style={{ width: `${r.percent}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-right text-xs">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="flex-1 space-y-3">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="border p-3 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {r.name}
                    </span>
                    <div className="flex space-x-1 text-[#e94e30]">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={16}
                          fill={j < r.rating ? "#E9BB02" : "none"}
                          stroke="#E9BB02"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">{r.text}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      {r.images.map((img, k) => (
                        <img
                          key={k}
                          src={img}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
