import React from "react";

const Rating = ({ rating }: { rating: number }) => {
  const widthPercentage = (rating / 5) * 100;

  return (
    <div className="flex flex-row gap-2 items-center mt-1 mb-1">
      <p className="text-sm font-medium">{rating.toFixed(1)}</p>
      <div className="relative flex items-center" style={{ width: "80px" }}>
        <div
          className="absolute top-0 left-0 flex"
          style={{
            width: `${widthPercentage}%`,
            overflow: "hidden",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <img
              src="/images/star.png"
              alt="star"
              className="w-4 h-4"
              key={`filled-${index}`}
            />
          ))}
        </div>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <img
              src="/images/star.png"
              alt="star"
              className="w-4 h-4 opacity-20"
              key={`background-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
