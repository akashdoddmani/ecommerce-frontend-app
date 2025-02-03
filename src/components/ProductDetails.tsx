"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateOriginalPrice } from "@/utils";
import Rating from "@/components/Rating";
import Carousel from "@/components/Carousel";
import { addItem, removeItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { useGetProductDetailsQuery } from "@/store/apiSlice";
import { useParams } from "next/navigation";

// Define a type for reviews if not already defined
interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
}

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { productID } = useParams();
  const isInCart = cartItems.some((item) => item.id == productID);
  const {
    data: productData,
    error,
    isLoading,
  } = useGetProductDetailsQuery(productID as string);

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeItem(productData.id));
    } else {
      dispatch(
        addItem({
          id: productData.id,
          name: productData.title,
          price: productData.price,
          quantity: 1,
          imageUrl: productData.images[0],
        })
      );
    }
  };

  if (isLoading)
    return (
      <p className="text-xl text-gray-500 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-xl text-gray-500 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Error loading product details
      </p>
    );

  return (
    <div className="pt-4">
      <div className="w-full  md:w-[60%] md:mx-auto pt-0 md:pt-10">
        <Carousel images={productData.images} />
      </div>
      <div className="flex flex-col mt-4">
        <h1 className="text-2xl font-bold text-black">{productData.title}</h1>
        <p className="text-sm text-gray-500">{productData.description}</p>
        <Rating rating={productData.rating} />
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center bg-primary/10 rounded-lg p-2 mb-2 mt-2">
          <p className="text-xl flex flex-col md:flex-row gap-2">
            <span>
              <span className="font-bold text-black">Price:</span> $
              {productData.price}
              <s className="ml-2 text-black">
                $
                {calculateOriginalPrice(
                  productData.price,
                  productData.discountPercentage
                )}
              </s>
            </span>
            <span className="text-sm text-primary bg-primary/30 px-2 py-1 rounded-lg">
              {productData.discountPercentage}% off
            </span>
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-bold">Tags:</span>{" "}
            {productData.tags.join(", ")}
          </p>
        </div>
        <span className="text-black">• {productData.warrantyInformation}</span>{" "}
        <span className="text-black">• {productData.shippingInformation}</span>{" "}
        <span className="text-black">• {productData.returnPolicy}</span>
        <button
          className={`w-full bg-primary px-4 py-2 rounded-lg mt-4 self-center ${
            isInCart
              ? "bg-primary/20 text-primary border border-primary/50"
              : "bg-primary text-primary-foreground"
          }`}
          onClick={handleCartAction}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <h2 className="text-lg font-bold mt-4 mb-2 text-black">Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productData.reviews.map((review: Review, index: number) => (
            <div
              key={index.toString()}
              className="flex flex-col bg-primary/10 rounded-lg p-4"
            >
              <p className="font-bold text-primary">{review.reviewerName}</p>
              <Rating rating={review.rating} />
              <p className="text-sm text-gray-500">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
