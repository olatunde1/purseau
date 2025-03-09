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

const ProductCard = ({ product }) => {
  const { averageRating } = calculateReviewStats(product?.reviews || []);
  return (
    <Card className="hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
      <CardHeader>
        <img
          src={product?.images[0]?.url || sampleimage}
          alt={product?.name}
          className="object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = sampleimage;
          }}
        />
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
