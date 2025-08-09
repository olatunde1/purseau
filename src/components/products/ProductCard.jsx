import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import sampleimage from "@/assets/images/sampleimage.jpg";
import { Heart, Star } from "lucide-react";
import { calculateReviewStats } from "@/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAddRecentProduct from "@/hooks/api/mutation/products/useAddRecentProduct";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAddToCart } from "@/hooks/api/mutation/carts/cartOperations";
import { useAuthStore } from "@/store/authStore";

const ProductCard = ({ product }) => {
  const { mutate: addRecent } = useAddRecentProduct(product?._id ?? "");
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  const userId = currentUser?.userId || "";
  console.log(userId, "idd");

  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleView = () => {
    addRecent({
      onSuccess: (response) => {
        console.log(response, "response");
        toast.success("view added successfully!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Error applying");
      },
    });
  };

  const { averageRating } = calculateReviewStats(product?.reviews || []);

  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click navigation

    const cartItem = {
      userId,
      productId: product?._id,
      quantity: 1, // Default to 1, or you could add a quantity selector
      selectedColor: product.availableColors?.[0] || "", // Default to first color if exists
      selectedSize: product.size || "L", // Default to first size if exists or "L"
    };

    addToCart(cartItem, {
      onSuccess: () => {
        toast.success("Added to cart successfully!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Error adding to cart");
      },
    });
  };

  return (
    <Card
      onClick={() => {
        handleView();
        navigate(`/product-description/${product?._id}`);
      }}
      className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden group"
    >
      <CardHeader>
        <div className="h-[280px] w-full relative bg-[#FFE4DA]">
          <img
            src={product?.images[0]?.url || sampleimage}
            alt={product?.name}
            className=" absolute inset-0 object-cover w-full h-full rounded-t-lg bg-[#FFE4DA]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = sampleimage;
            }}
          />
          <button className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-white transition-colors mr-2">
            <Heart
              onClick={() => toggleFavorite(product.id)}
              className={`h-5 w-5 ${
                favorites.has(product.id)
                  ? "stroke-[#E94E30] fill-[#E94E30]"
                  : "stroke-[#E94E30]"
              }`}
            />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="flex justify-between items-center">
          <span>{product?.name}</span>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < Math.round(averageRating)
                    ? "text-orange-500"
                    : "text-gray-400"
                }`}
                fill={
                  index < Math.round(averageRating) ? "currentColor" : "none"
                }
              />
            ))}
          </div>
        </CardTitle>
        <CardDescription className="mt-2">
          {product?.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center">
        <span className="text-lg font-semibold">
          ₦{product?.pricing?.perQuantity?.onePiece}
        </span>
        <Button
          onClick={handleAddToCart}
          className="invisible group-hover:visible ml-[34px] mb-[4px] bg-[#E94E30] text-[12px] hover:shadow-md"
        >
          {isPending ? "..." : "Add to Cart"}
        </Button>
        <span className="text-sm text-red-600">
          {product.pricing?.percentageDiscount}% off
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
