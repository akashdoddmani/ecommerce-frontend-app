export const calculateOriginalPrice = (
  discountedPrice: number,
  discountPercentage: number
) => {
  return ((discountedPrice * 100) / (100 - discountPercentage)).toFixed(2);
};
