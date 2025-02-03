"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { RootState } from "@/store/store";
import {
  setCategories,
  setProducts,
  sortByPrice,
  sortByRating,
  setTotalProducts,
} from "@/store/productsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProductsQuery, useGetCategoriesQuery } from "@/store/apiSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  discountPercentage: number;
}

const ProductList: React.FC<unknown> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const { data: categories } = useGetCategoriesQuery({});

  const products = useSelector((state: RootState) => state.products.products);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  const { data, error, isLoading } = useGetProductsQuery({
    skip: Number(searchParams.get("skip")) || 0,
    ...(selectedCategory && { category: selectedCategory }),
  });

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.products || []));
      dispatch(setTotalProducts(data.total || 0));
    }
  }, [data, dispatch]);

  const handleSort = (criteria: string) => {
    if (criteria === "price") {
      dispatch(sortByPrice());
    } else if (criteria === "rating") {
      dispatch(sortByRating());
    }
    setShowSortOptions(false);
  };

  const onClickSelectCategory = () => {
    setShowCategoryOptions(!showCategoryOptions);
    if (showSortOptions) {
      setShowSortOptions(false);
    }
  };

  const onClickSelectSort = () => {
    setShowSortOptions(!showSortOptions);
    if (showCategoryOptions) {
      setShowCategoryOptions(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("category", category);
    currentParams.set("skip", "0");
    router.push(`?${currentParams.toString()}`);
    setShowCategoryOptions(false);
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
        Error loading products
      </p>
    );

  return (
    <>
      <div className="flex justify-end mb-4">
        {/* Category Dropdown */}
        <div className="relative inline-block text-left mr-4">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClickSelectCategory}
          >
            Select Category
          </button>
          {showCategoryOptions && (
            <div
              className="max-h-[300px] overflow-y-auto origin-top-left absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-300"
              role="menu"
              aria-orientation="vertical"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {categories.map((category: string, index: number) => (
                  <div key={index.toString()}>
                    <button
                      className={`text-gray-700 block px-4 py-2 text-sm w-full text-left ${
                        category === selectedCategory ? "bg-gray-200" : ""
                      }`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                    {index !== categories.length - 1 && (
                      <div className="border-b border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={onClickSelectSort}
          >
            Sort By
          </button>
          {showSortOptions && (
            <div
              className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 bg-white border border-gray-300"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <button
                  onClick={() => handleSort("price")}
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  Price
                </button>
                <div className="border-b border-gray-300" />
                <button
                  onClick={() => handleSort("rating")}
                  className="text-gray-700 block px-4 py-2 text-sm w-full text-left"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  Rating
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        productsPerPage={12} // Adjust based on your pagination setup
      />
    </>
  );
};

export default ProductList;
