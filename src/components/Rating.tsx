import React from "react";
import Image from "next/image";

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
            <Image
              src="/images/star.png"
              alt="star"
              width={16}
              height={16}
              key={`filled-${index}`}
            />
          ))}
        </div>
        <div className="flex opacity-30">
          {[...Array(5)].map((_, index) => (
            <Image
              src="/images/star.png"
              alt="star"
              width={16}
              height={16}
              key={`background-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
