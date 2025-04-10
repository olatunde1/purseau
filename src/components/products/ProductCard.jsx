import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import sampleimage from "@/assets/images/sampleimage.jpg";
import { Star } from "lucide-react";
import { calculateReviewStats } from "@/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAddRecentProduct from "@/hooks/api/mutation/products/useAddRecentProduct";

const ProductCard = ({ product }) => {
  const { mutate: addRecent } = useAddRecentProduct(product?._id ?? "");
  const navigate = useNavigate();

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
  return (
    <Card
      onClick={() => {
        handleView();
        navigate(`/product-description/${product?._id}`);
      }}
      className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden"
    >
      <CardHeader>
        <div className="h-[280px] w-full relative">
          <img
            src={product?.images[0]?.url || sampleimage}
            alt={product?.name}
            className=" absolute inset-0 object-contain w-full h-full rounded-t-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = sampleimage;
            }}
          />
          {/* <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0803 15.8448C9.83062 15.9329 9.41938 15.9329 9.16969 15.8448C7.04 15.1177 2.28125 12.0848 2.28125 6.94415C2.28125 4.67493 4.10984 2.83899 6.36437 2.83899C7.70094 2.83899 8.88328 3.48524 9.625 4.48399C10.3667 3.48524 11.5564 2.83899 12.8856 2.83899C15.1402 2.83899 16.9688 4.67493 16.9688 6.94415C16.9688 12.0848 12.21 15.1177 10.0803 15.8448Z"
              stroke="#E94E30"
              stroke-width="1.10156"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> */}
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
        <span className="text-sm text-red-600">
          {product.pricing?.percentageDiscount}% off
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
