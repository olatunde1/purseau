
import { Star } from "lucide-react";

const RATINGS = [1, 2, 3, 4, 5];

const RatingFilter = ({ selectedRating, onChange }) => {
  return (
    <div className="mt-2 flex flex-row gap-4">
      {RATINGS.map((rating) => (
        <div
          key={rating}
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => onChange(rating)}
        >
          <input
            type="checkbox"
            id={`rating-${rating}`}
            className="hidden"
            checked={selectedRating === rating}
            onChange={() => onChange(rating)}
            aria-label={`Select ${rating} star rating`}
          />
          <div className="flex items-center">
            <Star
              className={`h-4 w-4 ${
                selectedRating === rating ? "text-orange-500" : "text-gray-400"
              }`}
              fill={selectedRating === rating ? "currentColor" : "none"}
            />
            <span className="ml-1">{rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingFilter;
