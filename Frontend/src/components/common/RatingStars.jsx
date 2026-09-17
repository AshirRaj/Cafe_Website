import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({
  rating = 5,
  count,
  size = 'sm',
  className = '',
  showNumber = true,
}) => {
  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              star <= Math.round(rating)
                ? 'fill-amber-500 text-amber-500'
                : 'text-warmgray-200 fill-warmgray-200'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-warmgray-800">
          {roundedRating.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-warmgray-600 font-normal">
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
