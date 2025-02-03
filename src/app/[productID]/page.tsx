import React from "react";
import ProductDetails from "@/components/ProductDetails";

const ProductPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 mb-10">
        <ProductDetails />
      </main>
    </div>
  );
};

export default ProductPage;
