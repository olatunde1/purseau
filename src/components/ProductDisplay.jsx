import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import useGetProducts from "@/hooks/api/queries/product/useGetProducts";
import sampleimage from "@/assets/images/sampleimage.jpg";
import { useAddToCart } from "@/hooks/api/mutation/carts/cartOperations";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  "Clothes",
  "Bags",
  "Shoes",
  "Jewelries",
  "Accessories",
  "Beauties",
];

export default function ProductDisplay() {
  const [selectedCategory, setSelectedCategory] = useState("Clothes");
  const [activeCategory, setActiveCategory] = useState("Clothes");
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const params = Object.fromEntries(
    Object.entries({
      category: selectedCategory,
      limit: 8,
    }).filter(([, value]) => value !== undefined && value !== null)
  );

  const { data: Allproducts, isPending, error } = useGetProducts(params);
  const products = Allproducts?.data?.result?.items ?? [];

  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    newFavorites.has(productId)
      ? newFavorites.delete(productId)
      : newFavorites.add(productId);
    setFavorites(newFavorites);
  };

  const { currentUser } = useAuthStore();
  const userId = currentUser?.userId || "";
  const { mutate: addToCart } = useAddToCart();
  const [pendingId, setPendingId] = useState(null);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    setPendingId(product._id);
    const cartItem = {
      userId,
      productId: product?._id,
      quantity: 1,
      selectedColor: product.availableColors?.[0] || "",
      selectedSize: product.size || "L",
    };

    addToCart(cartItem, {
      onSuccess: () => {
        toast.success("Added to cart successfully!");
        setPendingId(null);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Error adding to cart");
        setPendingId(null);
      },
    });
  };

  const calculateDiscountPrice = (price, discount) => {
    if (!discount) return null;
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="mx-auto p-4 hidden lg:block ">
        {/* Category Buttons */}
        <div className="select-category mb-8 md:mb-16">
          <div className="select-category-button flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveCategory(category);
                }}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`text-sm md:text-base rounded-full transition-all ${
                  activeCategory === category 
                    ? "bg-[#E94E30] text-white" 
                    : "bg-[#F2F2F7] text-black hover:bg-[#E94E30] hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isPending && 
            Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="rounded-xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))
          }
          
          {error && (
            <div className="col-span-full text-center py-10">
              <p className="text-red-500 mb-4">Failed to load products. Please try again.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          )}
          
          {!isPending && products.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}

          {!isPending && products.map((product) => {
            const originalPrice = product?.pricing?.perQuantity?.onePiece;
            const discountPercentage = product.pricing?.percentageDiscount;
            const discountedPrice = calculateDiscountPrice(originalPrice, discountPercentage);
            
            return (
              <Card
                key={product._id}
                className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl  duration-300 transform transition-transform hover:scale-105"
                onClick={() => navigate(`/product-description/${product?._id}`)}
              >
                <div className="h-48 w-full relative bg-white">
                  <img
                    src={product?.images[0]?.url || sampleimage}
                    alt={product.name}
                    className="object-contain absolute inset-0 w-full h-48 p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = sampleimage;
                    }}
                  />

                  <button
                    onClick={(e) => toggleFavorite(product._id, e)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(product._id)
                          ? "stroke-[#E94E30] fill-[#E94E30]"
                          : "stroke-[#E94E30]"
                      }`}
                    />
                  </button>

                  {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#E94E30] text-white text-xs font-bold px-2 py-1 rounded">
                        -{discountPercentage}%
                      </span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <CardHeader className="p-0 mb-2">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                  </CardHeader>

                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < Math.floor(product.rating || 0)
                            ? "fill-yellow-400 stroke-yellow-400"
                            : "fill-gray-300 stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-black">
                        ₦{discountedPrice || originalPrice}
                      </span>
                      {discountedPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₦{originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-[#E94E30] hover:bg-[#d93e20]"
                      disabled={pendingId === product._id}
                    >
                      {pendingId === product._id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => navigate(`/shop?category=${selectedCategory}`)}
            className="view-more bg-[#E94E30] hover:bg-[#d93e20]"
          >
            View More
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className=" mx-auto px-4 py-8 block lg:hidden ">
        {/* Category Buttons */}
        <div className="mb-6">
          {/* <h2 className="text-xl font-bold text-center mb-4">Shop by Category</h2> */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-4 text-xs sm:text-sm ${
                  selectedCategory === category 
                    ? "bg-[#E94E30] text-white" 
                    : "bg-[#F2F2F7] text-black"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {isPending && 
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-1/2 mb-2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))
          }
          
          {error && (
            <div className="col-span-2 text-center py-6">
              <p className="text-red-500 mb-3 text-sm">Failed to load products.</p>
              <Button onClick={() => window.location.reload()} size="sm">Retry</Button>
            </div>
          )}
          
          {!isPending && products.length === 0 && (
            <div className="col-span-2 text-center py-6">
              <p className="text-gray-500 text-sm">No products found in this category.</p>
            </div>
          )}

          {!isPending && products.map((product) => {
            const originalPrice = product?.pricing?.perQuantity?.onePiece;
            const discountPercentage = product.pricing?.percentageDiscount;
            const discountedPrice = calculateDiscountPrice(originalPrice, discountPercentage);
            
            return (
              <Card
                key={product._id}
                className="overflow-hidden"
                onClick={() => navigate(`/product-description/${product?._id}`)}
              >
                <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={product?.images[0]?.url || sampleimage}
                    alt={product.name}
                    className="object-contain w-full h-40"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = sampleimage;
                    }}
                  />
                  
                  <button
                    onClick={(e) => toggleFavorite(product._id, e)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.has(product._id)
                          ? "stroke-[#E94E30] fill-[#E94E30]"
                          : "stroke-gray-600"
                      }`}
                    />
                  </button>
                  
                  {discountPercentage > 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#E94E30] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        -{discountPercentage}%
                      </span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-3 w-3 ${
                          index < Math.floor(product.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">
                        ₦{discountedPrice || originalPrice}
                      </span>
                      {discountedPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ₦{originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      onClick={(e) => handleAddToCart(product, e)}
                      size="sm"
                      className="h-8 w-8 p-0 bg-[#E94E30] hover:bg-[#d93e20]"
                      disabled={pendingId === product._id}
                    >
                      {pendingId === product._id ? "..." : "+"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!isPending && products.length > 0 && (
          <div className="text-center">
            <Button
              onClick={() => navigate(`/shop?category=${selectedCategory}`)}
              size="sm"
              variant="outline"
              className="rounded-full bg-white border-[#E94E30] text-[#E94E30] hover:bg-[#E94E30] hover:text-white"
            >
              View More {selectedCategory}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}