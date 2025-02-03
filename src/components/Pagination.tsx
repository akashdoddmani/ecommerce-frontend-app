"use client";

import React from "react";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSkip = Number(searchParams.get("skip")) || 0;

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentPage = Math.floor(currentSkip / productsPerPage) + 1;

  const handlePageChange = (newPage: number) => {
    const newSkip = (newPage - 1) * productsPerPage;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("skip", newSkip.toString());
    router.push(`?${currentParams.toString()}`);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-16">
      <ChevronFirstIcon
        onClick={handleFirstPage}
        aria-disabled={currentPage === 1}
        className={`bg-primary text-white p-2 w-8 h-8 rounded-full ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      />
      <ChevronLeftIcon
        onClick={() => handlePageChange(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`bg-primary text-white p-2 w-8 h-8 rounded-full ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      />
      <span className="text-sm font-medium text-primary">
        Page {currentPage} of {totalPages}
      </span>
      <ChevronRightIcon
        onClick={() => handlePageChange(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`bg-primary text-white p-2 w-8 h-8 rounded-full ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      />
      <ChevronLastIcon
        onClick={handleLastPage}
        aria-disabled={currentPage === totalPages}
        className={`bg-primary text-white p-2 w-8 h-8 rounded-full ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      />
    </div>
  );
};

export default Pagination;
