"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="container mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        <p className="text-xl text-gray-500 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Your cart is empty.
        </p>
      ) : (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default CartPage;
