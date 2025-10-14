import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Edit, Star } from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.order; // the product you passed via navigate

  if (!product) {
    return <p className="p-4 text-red-500">No product data found.</p>;
  }

  const productImages = product.images?.map((img) => img.secureUrl) || [
    "https://via.placeholder.com/500x500?text=No+Image",
  ];

  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors?.[0] || "#E94E30"
  );
  const [selectedSize, setSelectedSize] = useState(
    JSON.parse(product.size || "[]")[0] || "EU 38"
  );

  const reviews = product.reviews?.length
    ? product.reviews
    : [
        {
          name: "No reviews yet",
          rating: 0,
          text: "This product hasn’t been reviewed yet.",
          images: [],
          date: "",
        },
      ];

  const pricing = product.pricing?.perQuantity || {};
  const discount = product.pricing?.percentageDiscount || 0;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Product Details</h1>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-[1092px] mx-auto gap-6">
        {/* Left: Images */}
        <div className="w-full lg:w-[320px]">
          <div className="border rounded-xl overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>

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
          {product.availableColors?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Available Colors
              </h3>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                {product.availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    className="h-9 w-9 rounded-full border shadow-sm transition-transform hover:scale-105"
                    style={{
                      backgroundColor: color.toLowerCase(),
                      boxShadow:
                        selectedColor === color
                          ? `0 0 0 3px white, 0 0 0 6px ${color}`
                          : undefined,
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Selected: <span className="font-medium">{selectedColor}</span>
              </p>
            </div>
          )}

          {/* Sizes */}
          {product.size && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Available Sizes
              </h3>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {JSON.parse(product?.size)?.map((size) => (
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
          )}
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-[708px]">
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
            <h2 className="text-lg sm:text-2xl font-semibold">
              {product.name}
            </h2>
            <Link to="/admin/edit-create-product" state={{ order: product }}>
                <button className="flex items-center justify-center gap-2 bg-[#F2F2F7] text-[#1B121B] px-4 py-2 rounded-lg shadow text-sm sm:text-base w-full sm:w-auto">
                  <Edit size={16} /> Edit
                </button>
            </Link>
          
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Product ID: {product.productId}
          </p>

          <h3 className="font-semibold text-lg pb-2">Product Summary</h3>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            {product.description || "No description available."}
          </p>

          {/* Pricing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div>
              <p className="font-bold text-2xl sm:text-3xl">
                ₦ {pricing.onePiece ?? "—"}
              </p>
              <p className="text-gray-500 text-xs">1 piece</p>
            </div>
            <div>
              <p className="font-bold text-xl text-[#5B5B5B]">
                ₦ {pricing.twoToFive ?? "—"}
              </p>
              <p className="text-gray-500 text-xs">2–5 pieces</p>
            </div>
            <div>
              <p className="font-bold text-xl text-[#5B5B5B]">
                ₦ {pricing.fiveToTen ?? "—"}
              </p>
              <p className="text-gray-500 text-xs">5–10 pieces</p>
            </div>
            <div className="text-red-500 font-semibold text-sm bg-[#FFE4DA] w-fit px-3 py-1 rounded-md text-center">
              -{discount}%
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white grid grid-cols-3 mt-6 border rounded-xl shadow overflow-hidden text-center">
            <div className="p-3 sm:p-4 border-r border-gray-200">
              <p className="text-lg sm:text-2xl font-bold">
                {product.availableQuantity}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">Stock</p>
            </div>
            <div className="p-3 sm:p-4 border-r border-gray-200">
              <p className="text-lg sm:text-2xl font-bold">{product.weight}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Weight</p>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-lg sm:text-2xl font-bold">
                {product.material}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">Material</p>
            </div>
          </div>

          {/* Additional Info */}
          <h1 className="font-semibold text-lg sm:text-xl pt-6">
            Additional Information
          </h1>
          <table className="mt-4 w-full border rounded-xl bg-white shadow text-sm sm:text-base">
            <tbody>
              <tr className="bg-[#F8F8F8]">
                <td className="px-4 py-3 text-gray-600 font-medium">Brand</td>
                <td className="px-4 py-3 text-gray-600">
                  {product.brand?.join(", ")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600 font-medium">
                  Category
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {product.category} / {product.subCategory}
                </td>
              </tr>
              <tr className="bg-[#F8F8F8]">
                <td className="px-4 py-3 text-gray-600 font-medium">SKU</td>
                <td className="px-4 py-3 text-gray-600">{product.SKU}</td>
              </tr>
            </tbody>
          </table>

          {/* Reviews */}
          <h1 className="font-semibold text-lg sm:text-xl pt-6">
            Ratings & Reviews
          </h1>
          <div className="mt-3 space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="border p-3 rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{r.name}</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
