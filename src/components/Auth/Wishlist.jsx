import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import useGetWishlist from "@/hooks/api/queries/useGetWishList.jsx";
import {
  useAddToCart,
  useUnLikeAProduct,
} from "@/hooks/api/mutation/carts/cartOperations.js";
import { useAuthStore } from "@/store/authStore.js";
import { toast } from "sonner";
import useCartStore from "@/store/cartStore";

const Wishlist = () => {
  const { currentUser } = useAuthStore();
  const userId = currentUser?._id || "";
  const { data: wishList, isPending: wishLoad, refetch } = useGetWishlist();
  const wishlistItems = wishList?.data?.likedProducts?.items || [];
  const { cartItems } = useCartStore();

  console.log(cartItems, "cart items");

  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: unlikeProduct } = useUnLikeAProduct();
  const cartProductIds = new Set(
    cartItems?.map((cartItem) => cartItem.productId?._id)
  );

  return (
    <div className="p-0 lg:p-4 w-[388px] lg:w-[878px]">
      <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
      {wishLoad ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {wishlistItems.map((item) => {
            const inStock = item.availableQuantity > 0;
            const price =
              item.pricing?.perQuantity?.onePiece ||
              item.pricing?.priceRange?.minPrice ||
              0;
            const discount = item.pricing?.percentageDiscount
              ? `-${item.pricing.percentageDiscount}%`
              : null;

            // 🟢 addToCart handler (scoped to this item)
            const handleAddToCart = (e) => {
              e.stopPropagation();

              const cartItem = {
                userId,
                productId: item?._id,
                quantity: 1,
                selectedColor: item.availableColors?.[0] || "",
                selectedSize: item.size || "L",
              };

              addToCart(cartItem, {
                onSuccess: () => {
                  toast.success("Added to cart successfully!");
                },
                onError: (error) => {
                  toast.error(
                    error?.response?.data?.message || "Error adding to cart"
                  );
                },
              });
            };

            // 🟢 remove handler (scoped to this item)
            const handleRemove = () => {
              unlikeProduct(item._id, {
                onSuccess: () => {
                  toast.success("Removed from wishlist");
                  refetch();
                },
                onError: () => toast.error("Failed to remove from wishlist"),
              });
            };

            return (
              <div
                key={item._id}
                className={`flex flex-col md:flex-row w-[370px] lg:w-[798px] bg-[#F2F2F7] lg:mx-8 justify-between items-start md:items-center gap-4 p-4 border rounded-xl shadow-sm ${
                  !inStock ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-6">
                     {/* Image */}
                <div className="w-[130px] h-[130px] md:w-28  bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  {item.images?.[0]?.url ? (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-[130px] h-[130px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p
                    className={`text-sm mt-3 font-medium ${
                      inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-lg text-gray-900">
                      ₦{price.toLocaleString()}
                    </span>
                    {discount && (
                      <span className="text-red-500 text-sm font-medium">
                        {discount}
                      </span>
                    )}
                  </div>
                </div>
                </div>
                {/* Image */}
                <div className="hidden w-[130px] h-[130px] md:w-28  bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  {item.images?.[0]?.url ? (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-[130px] h-[130px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>

                {/* Details */}
                <div className="hidden flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p
                    className={`text-sm mt-3 font-medium ${
                      inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-lg text-gray-900">
                      ₦{price.toLocaleString()}
                    </span>
                    {discount && (
                      <span className="text-red-500 text-sm font-medium">
                        {discount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col  lg:items-start md:items-center gap-2">
                  {!cartProductIds.has(item._id) && (
                    <Button
                      disabled={!inStock || isPending}
                      onClick={handleAddToCart}
                      className={`bg-[#E94E30] text-white hover:bg-[#d04328] px-4 py-2 ${
                        !inStock ? "cursor-not-allowed bg-gray-400" : ""
                      }`}
                    >
                      {isPending ? "..." : "Add to Cart"}
                    </Button>
                  )}

                  <button
                    onClick={handleRemove}
                    className="text-sm text-red-600 flex items-center mt-12 gap-2 hover:underline"
                  >
                    <FaTrashAlt className="text-xs" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          {wishlistItems?.length === 0 && <p>No Liked Product</p>}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
