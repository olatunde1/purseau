import { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Star, Heart } from "lucide-react"; // For star icons (install lucide-react if not already installed)
import { useNavigate } from "react-router-dom"; // For navigation
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"; // shadcn/ui Card
import useGetProducts from "@/hooks/api/queries/product/useGetProducts";
import sampleimage from "@/assets/images/sampleimage.jpg";
import { useAddToCart } from "@/hooks/api/mutation/carts/cartOperations";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

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

  const navigate = useNavigate();

  const params = Object.fromEntries(
    Object.entries({
      category: selectedCategory,
      limit: 8, // only first 8 for preview
    }).filter(([, value]) => value !== undefined && value !== null)
  );

  const { data: Allproducts, isPending, error } = useGetProducts(params);
  const products = Allproducts?.data?.result?.items ?? [];

  const toggleFavorite = (productId) => {
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

  const handleAddToCart = (product) => {
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

  return (
    <div className="container mx-auto p-4">
      {/* Category Buttons */}
      <div className="select-category mb-16">
        <div className="select-category-button flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveCategory(category);
              }}
              variant={selectedCategory === category ? "default" : "outline"}
              // Apply different styles based on active category
              style={{
                backgroundColor:
                  activeCategory === category ? "#E94E30" : "transparent",
                color: activeCategory === category ? "#FFFFFF" : "#000000",
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {isPending && <p className="text-center">Loading...</p>}
        {error && <p>Failed to load products.</p>}
        {!isPending &&
          products.map((product) => (
            <Card
              onClick={() => {
                navigate(`/product-description/${product?._id}`);
              }}
              key={product._id}
              className="cardDetails rounded-xl hover:shadow-xl hover:bg-[#f3f3f3] bg-white shadow-md transform transition-transform duration-1000 hover:scale-105"
            >
              <CardContent>
                <div className="h-48 w-full relative bg-[white]">
                  <img
                    src={product?.images[0]?.url || sampleimage}
                    alt={product.name}
                    className="object-contain absolute inset-0 mb-4 rounded-lg w-full h-48"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = sampleimage;
                    }}
                  />

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors mr-2"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.has(product.id)
                          ? "stroke-[#E94E30] fill-[#E94E30]"
                          : "stroke-[#E94E30]"
                      }`}
                    />
                  </button>
                </div>
                <CardHeader>
                  <h2 className="text-xl px-2">{product.name}</h2>
                </CardHeader>

                {/* Star Rating */}
                <div className="priceRating">
                  <p className="text-gray-600 product-description px-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 mb-2 px-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < Math.floor(product.rating)
                            ? "fill-yellow-400 stroke-yellow-400"
                            : "fill-gray-300 stroke-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between px-2 h-[60px]">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-black-600">
                      ₦{product?.pricing?.perQuantity?.onePiece}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.pricing?.percentageDiscount}
                    </span>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    id="add-to-cart"
                    className="hover:shadow-md"
                  >
                    {pendingId === product._id ? "..." : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Button
        onClick={() => {
          navigate(`/shop?category=${selectedCategory}`);
        }}
        className="view-more"
      >
        View More
      </Button>
    </div>
  );
}
