"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src="/images/pkart_logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-auto h-auto"
          />
        </Link>

        <div className="flex space-x-4">
          <Link href="/cart" className="hover:text-gray-300 relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute bottom-3 left-3 bg-primary-foreground text-primary rounded-full text-xs w-3 h-3 p-2 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
