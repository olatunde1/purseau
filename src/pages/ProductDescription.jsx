import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaStar } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import ExploreSimilarProduct from "@/components/ExploreSimilarProduct";
import YouMightAlsoLike from "@/components/YouMightLike";
import RecentlyViewed from "@/components/RecentlyViewed";
import { StayLoop } from "@/components/StayLoop";
import { Footer } from "@/components/Footer";
import { RiErrorWarningLine } from "react-icons/ri";
import ReviewSection from "@/components/ReviewSection";
import Pagination from "@/components/Pagination";
import { Link, useParams } from "react-router-dom";
import Cart from "../assets/images/cart.png";
import useGetProducts from "@/hooks/api/queries/product/useGetProducts";

// Fallback images (in case we can't use the API image URLs)
import Bag1 from "../assets/images/prod-desc-bag1.png";
import Bag2 from "../assets/images/prod-desc-bag2.png";
import Bag3 from "../assets/images/prod-desc-bag3.png";
import Bag4 from "../assets/images/prod-desc-bag4.png";
import GeneralLoader from "@/components/general/GeneralLoader";
import { useAddToCart } from "@/hooks/api/mutation/carts/cartOperations";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

const fallbackImages = [Bag1, Bag2, Bag3, Bag4];

const colorMap = {
  Red: "bg-[#CDC3AD]",
  Blue: "bg-[#D9ACBB]",
  Black: "bg-[#000000]",
  Green: "bg-[#CDCFC4]",
  Yellow: "bg-yellow-500",
  White: "bg-white",
};

const borderColorMap = {
  Red: "border-[#CDC3AD]",
  Blue: "border-[#D9ACBB]",
  Black: "border-black",
  Green: "border-[#CDCFC4]",
  Yellow: "border-yellow-500",
  White: "border-white",
};

const ProductDescription = () => {
  const { id } = useParams();
  const params = { id: id };
  const { data, isPending, error } = useGetProducts(params);

  const { currentUser } = useAuthStore();

  const userId = currentUser?.userId || "";
  console.log(userId, "idd");

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [activeButton, setActiveButton] = useState(null); // 'cart' | 'buy' | null
  const [userRating, setUserRating] = useState(0);
  const [activeSection, setActiveSection] = useState("description");

  // State for product-specific selections
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Process API data when available
  useEffect(() => {
    if (data?.data?.result?.items?.[0]) {
      // Set initial color if available
      const availableColors = data.data.result.items[0].availableColors || [];
      if (availableColors.length > 0 && !selectedColor) {
        setSelectedColor(availableColors[0]);
      }

      // Set initial image if available
      const images = data.data.result.items[0].images || [];
      if (images.length > 0 && !selectedImage) {
        setSelectedImage(
          images[0].secureUrl || images[0].url || fallbackImages[0]
        );
      }
    }
  }, [data]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.reviewRating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Loading state
  if (isPending) {
    return <GeneralLoader />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error loading product: {error.message}
        </div>
      </div>
    );
  }

  // No data state
  if (!data?.data?.result?.items?.[0]) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  // Get product data from API response
  const product = data.data.result.items[0];
  const pricing = product.pricing || {};
  const averageRating = calculateAverageRating(product.reviews);
  const reviewCount = product.reviews?.length || 0;

  // Use our selected image or fallback to the first image
  const displayImage =
    selectedImage ||
    product.images?.[0]?.secureUrl ||
    product.images?.[0]?.url ||
    fallbackImages[0];

  // Get images from API or use fallbacks
  const productImages =
    product.images?.map((img) => img.secureUrl || img.url) || fallbackImages;

  const handleAddToCart = () => {
    // if (!userId) {
    //   toast.error("Please login to add items to cart");
    //   return;
    // }

    const cartItem = {
      userId,
      productId: product._id,
      quantity: quantity,
      selectedColor: selectedColor || product.availableColors?.[0] || "",
      selectedSize: product.size || "L",
    };

    addToCart(cartItem, {
      onSuccess: () => {
        toast.success("Added to cart successfully!");
        setActiveButton("cart");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Error adding to cart");
      },
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 font-lato">
        <div className="container mx-auto px-4 py-8 font-lato">
          {/* Breadcrumb Section */}
          <div className="breadcrumb mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.category}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Product Images */}
            <div className="flex flex-col">
              <img
                src={displayImage}
                alt={product.name}
                className="md:w-[360px] w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = fallbackImages[0]; // Set default image on error
                }}
              />
              <div className="flex gap-2 mt-4">
                {productImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      displayImage === img
                        ? "border-[#E94E30]"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(img)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImages[index] || fallbackImages[0];
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Product Details */}
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      star <= averageRating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setUserRating(star)}
                  />
                ))}
                <span className="text-gray-700">({reviewCount} Reviews)</span>
              </div>

              {/* Stock Status */}
              <p className="text-green-600 font-semibold rounded-full bg-[#E6F4F1] w-24 flex gap-1 ">
                <RiErrorWarningLine className="mt-1 ml-2 " />
                {product.availableQuantity > 0 ? "In Stock" : "Out of Stock"}
              </p>

              {/* Price Section */}
              <div className="mt-3 flex items-center gap-8">
                <p className="text-red-500 font-extrabold text-xl">
                  ₦ {pricing.priceRange?.maxPrice || 0}
                </p>
                {pricing.amountAfterDiscount && (
                  <p className="text-gray-400 line-through text-sm">
                    ₦ {pricing.amountAfterDiscount}
                  </p>
                )}
                {pricing.discountAmount > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md">
                    -{pricing.percentageDiscount}%
                  </span>
                )}
              </div>

              {/* Bulk Purchase Pricing */}
              <div className="mt-4">
                <div className="grid gap-6 font-semibold ">
                  <div className="flex gap-16">
                    <p className="text-gray-600">
                      ₦{" "}
                      {pricing.perQuantity?.onePiece ||
                        pricing.priceRange?.maxPrice ||
                        0}
                    </p>
                    <p className="text-gray-600">
                      ₦ {pricing.perQuantity?.twoToFive || 0}
                    </p>
                    <p className="text-gray-600">
                      ₦ {pricing.perQuantity?.fiveToTen || 0}
                    </p>
                  </div>
                  <div className="flex gap-16">
                    <p className="text-gray-600">1 piece</p>
                    <p className="text-gray-600">2-5 pieces</p>
                    <p className="text-gray-600">5+ pieces</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-gray-600">{product.description}</p>

              {/* Color Selector */}
              {product.availableColors &&
                product.availableColors.length > 0 && (
                  <div className="mt-4">
                    <p className="font-semibold mb-1">Available Colors</p>
                    <div className="flex gap-2">
                      {product.availableColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 flex items-center justify-center 
                  transition-all duration-300
                  ${colorMap[color] || "bg-gray-200"}
                  border-transparent
                  hover:${borderColorMap[color] || "border-gray-300"}
                  hover:scale-105
                  ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-[#E94E30]"
                      : ""
                  }`}
                          aria-label={`${color} color option`}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Additional Info */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {product.SKU && (
                  <p className="text-gray-600">
                    <span className="font-semibold">SKU:</span> {product.SKU}
                  </p>
                )}
                {product.material && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Material:</span>{" "}
                    {product.material}
                  </p>
                )}
                {product.size && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Size:</span> {product.size}
                  </p>
                )}
                {product.weight && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Weight:</span>{" "}
                    {product.weight.toFixed(2)} kg
                  </p>
                )}
                {product.brand && product.brand.length > 0 && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Brand:</span>{" "}
                    {product.brand.join(", ")}
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mt-4">
                <p className="font-semibold mb-2">Quantity</p>
                <div className="flex items-center rounded-lg py-4 w-40 justify-between gap-4 ">
                  <Button
                    variant="ghost"
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center 
                          text-[#E94E30] bg-[#FFE4DA] 
                          hover:bg-red-600 hover:text-white 
                          shadow-md hover:shadow-lg 
                          transition-all duration-200"
                  >
                    <IoMdRemove size={20} />
                  </Button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center 
                          text-[#E94E30] bg-[#FFE4DA] 
                          hover:bg-red-600 hover:text-white 
                          shadow-md hover:shadow-lg 
                          transition-all duration-200"
                  >
                    <IoMdAdd size={20} />
                  </Button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap sm:flex-nowrap gap-4">
                <Button
                  onClick={handleAddToCart}
                  className={`group w-full sm:w-[288px] px-16 py-[18.5px] rounded-md border transition-colors duration-300 ${
                    activeButton === "cart"
                      ? "bg-[#E94E30] text-white border-[#E94E30]"
                      : "bg-white text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white"
                  }`}
                  disabled={product.availableQuantity <= 0 || isAddingToCart}
                >
                  {isAddingToCart ? (
                    "Adding..."
                  ) : (
                    <>
                      <img
                        src={Cart}
                        alt="Cart"
                        width="24px"
                        height="24px"
                        className={`mr-2 transition-all duration-300 ${
                          activeButton === "cart"
                            ? "filter invert brightness-0 contrast-200"
                            : "filter group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
                        }`}
                      />
                      Add To Cart
                    </>
                  )}
                </Button>

                <Link to="/shopping-cart">
                  <Button
                    onClick={() => setActiveButton("buy")}
                    className={`w-full sm:w-[288px] px-16 py-[18.5px] rounded-md border transition-colors duration-300 ${
                      activeButton === "buy"
                        ? "bg-[#E94E30] text-white border-[#E94E30]"
                        : "bg-white text-[#E94E30] border-[#E94E30] hover:bg-[#E94E30] hover:text-white"
                    }`}
                    disabled={product.availableQuantity <= 0}
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="product-tabs mt-8 ">
          <div className="mt-6 flex gap-4 border-b justify-center">
            {["description", "additionalInfo", "customerReviews"].map(
              (section) => (
                <button
                  key={section}
                  className={`pb-2 px-4 font-semibold   ${
                    activeSection === section
                      ? "border-b-2 border-[#E94E30] text-[#E94E30]"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  {section === "description"
                    ? "Product Description"
                    : section === "additionalInfo"
                    ? "Additional Information"
                    : "Customer Reviews"}
                </button>
              )
            )}
          </div>
          <div className="mt-4 text-gray-600">
            {activeSection === "description" && (
              <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
                <p>{product.description}</p>
              </div>
            )}
            {activeSection === "additionalInfo" && (
              <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-[#ECC297]">
                      <th className="p-3 text-left font-bold text-gray-700">
                        Feature
                      </th>
                      <th className="p-3 text-left font-bold text-gray-700">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries({
                      Brand: product.brand?.join(", "),
                      Weight: product.weight,
                      Material: product.material,
                      Size: product.size,
                      SKU: product.SKU,
                    }).map(([key, value]) => (
                      <tr className="border-none bg-[#FFF4F0]" key={key}>
                        <td className="p-3 font-bold text-gray-700">{key}</td>
                        <td className="p-3">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === "customerReviews" && (
              <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
                <div className="flex flex-col md:flex-row gap-8 mt-4 mx-auto justify-center md:w-[1200px] w-full">
                  {/* Rating Summary */}
                  <div className="flex flex-col items-center w-full md:w-1/6 border p-4 rounded-md bg-[#FFE4DA]">
                    <p className="text-4xl font-bold text-[#E94E30]">
                      {product.reviews[0]?.reviewRating || 0} / 5
                    </p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i <
                            Math.floor(product.reviews[0]?.reviewRating || 0)
                              ? "text-[#E94E30]"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">
                      ({product.reviews.length} Reviews)
                    </p>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="w-full md:w-2/3">
                    {Object.entries(
                      product.reviews.reduce((acc, review) => {
                        const rating = review.reviewRating.toString();
                        acc[rating] = (acc[rating] || 0) + 1;
                        return acc;
                      }, {})
                    )
                      .sort((a, b) => Number(a[0]) - Number(b[0]))
                      .reverse()
                      .map(([stars, count]) => (
                        <div
                          key={stars}
                          className="flex items-center gap-2 mb-2"
                        >
                          <p className="w-16 font-semibold">{stars} Star</p>
                          <div className="w-full bg-[#FFF4F0] rounded-full h-4 overflow-hidden">
                            <div
                              className="bg-[#E94E30] rounded-full h-4"
                              style={{
                                width: `${
                                  (count / product.reviews.length) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <ReviewSection />
              </div>
              // <div className="overflow-x-auto md:w-[1200px] w-full mt-16">
              //   <div className="flex flex-col md:flex-row gap-8 mt-4 mx-auto justify-center md:w-[1200px] w-full">
              //     <div className="flex flex-col items-center w-full md:w-1/6 border p-4 rounded-md bg-[#FFE4DA]">
              //       <p className="text-4xl font-bold text-[#E94E30]">
              //         {product.customerReviews.rating}
              //       </p>
              //       <div className="flex gap-1 mt-2">
              //         {[...Array(5)].map((_, i) => (
              //           <FaStar
              //             key={i}
              //             className={
              //               i < Math.floor(product.customerReviews.rating)
              //                 ? "text-[#E94E30]"
              //                 : "text-gray-300"
              //             }
              //           />
              //         ))}
              //       </div>
              //       <p className="text-gray-600">
              //         ({product.customerReviews.total} Reviews)
              //       </p>
              //     </div>
              //     <div className="w-full md:w-2/3">
              //       {Object.entries(product.customerReviews.breakdown)
              //         .reverse()
              //         .map(([stars, count]) => (
              //           <div
              //             key={stars}
              //             className="flex items-center gap-2 mb-2"
              //           >
              //             <p className="w-16 font-semibold">{stars} Star</p>
              //             <div className="w-full bg-[#FFF4F0] rounded-full h-4 overflow-hidden">
              //               <div
              //                 className="bg-[#E94E30] rounded-full h-4"
              //                 style={{
              //                   width: `${
              //                     (count / product.customerReviews.total) * 100
              //                   }%`,
              //                 }}
              //               ></div>
              //             </div>
              //             {/* <p className="w-8 text-right">{count}</p> */}
              //           </div>
              //         ))}
              //     </div>
              //   </div>
              //
              // </div>
            )}
          </div>
        </div>
      </div>
      <Pagination />
      <ExploreSimilarProduct />
      <YouMightAlsoLike />
      <div className="mt-20">
        <RecentlyViewed />
      </div>
      <StayLoop />
      <Footer />
    </>
  );
};

export default ProductDescription;
