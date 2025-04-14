import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SkeletonCard from "./SkeletonCard";

import Binary from "../assets/binary.png";
import SkyLand from "../assets/skyland.webp";

import { FaCircleInfo, FaXmark, FaTriangleExclamation } from "react-icons/fa6";
import Loader from "./Loader";
import Card from "./Card";

const ProductSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shops, setShops] = useState(null);
  const [error, setError] = useState(null);
  const [currentPages, setCurrentPages] = useState({});
  const [perPage, setPerPage] = useState(8);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(2); // mobile
      } else if (width < 1024) {
        setPerPage(4); // tablet
      } else {
        setPerPage(8); // desktop
      }
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setShops(null);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/scrape/${inputValue}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          setError(
            "You're sending too many requests. Please wait and try again."
          );
        } else {
          setError("Something went wrong while fetching data.");
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setShops(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex space-x-4">
          <form className="w-full ">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Khoj the Search..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 py-2 gradient-btn"
                onClick={() => handleSearch(true)}
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? <Loader /> : "Search"}
              </button>
              <button
                type="submit"
                className="text-gray-600 absolute end-24 bottom-5 text-sm "
                onClick={() => setInputValue("")}
                disabled={isLoading || !inputValue.trim()}
              >
                <FaXmark />
              </button>
            </div>
          </form>
        </div>
        <div className="flex text-red-500 items-center mt-1 md:text-xs text-[9px]">
          <FaCircleInfo className="mr-2" />
          Try to provide an accurate product name for better search results.
        </div>
        {error && (
          <div className="flex text-yellow-600 items-center mt-1 md:text-xs text-[9px]">
            <FaTriangleExclamation className="mr-2" />
            {error}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end mt-4 space-x-4 flex-wrap">
        <label className="text-sm font-medium text-gray-500">Price Range</label>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-2 py-1 text-sm border rounded w-28"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-2 py-1 text-sm border rounded w-28"
        />
        <label className="text-sm font-medium text-gray-500">In Stock</label>
        <input
          type="checkbox"
          checked={showInStockOnly}
          onChange={() => {
            setShowInStockOnly(!showInStockOnly);
            setCurrentPages({});
          }}
          className="w-4 h-4"
        />
      </div>

      {isLoading && (
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
          <div className="text-xs text-red-600 max-w-lg mx-auto text-center mt-4">
            Scraping data from multiple websites might take some time.
          </div>
        </div>
      )}

      {shops && (
        <div className="mt-8">
          {shops.map((shop, shopIndex) => {
            const extractNumbersFromString = (str) => {
              const regex = /[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/g;
              const matches = str.match(regex);
              if (matches && matches.length > 0) {
                const lastMatch = matches[matches.length - 1];
                const numericString = lastMatch.replace(/,/g, "");
                return parseFloat(numericString);
              } else {
                return "0";
              }
            };

            const filteredProducts = (shop?.products || []).filter(
              (product) => {
                const price = extractNumbersFromString(product?.price);

                const inStock = !showInStockOnly || price > 0;
                const aboveMin = !minPrice || price >= parseFloat(minPrice);
                const belowMax = !maxPrice || price <= parseFloat(maxPrice);

                return inStock && aboveMin && belowMax;
              }
            );

            const page = currentPages[shopIndex] || 1;
            const totalPages = Math.ceil(filteredProducts?.length / perPage);
            const paginatedProducts = filteredProducts.slice(
              (page - 1) * perPage,
              page * perPage
            );

            return (
              <div key={shopIndex} className="my-8">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={
                      shop.name === "Binary"
                        ? Binary
                        : shop.name === "SkyLand"
                        ? SkyLand
                        : shop.logo
                    }
                    alt={shop.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {paginatedProducts?.length === 0 ? (
                  <div className="text-prime text-sm text-center">
                    No Product Found
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {paginatedProducts?.map((product, i) => (
                      <Card key={i} product={product} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex justify-end items-center flex-wrap gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setCurrentPages((prev) => ({
                            ...prev,
                            [shopIndex]: i + 1,
                          }))
                        }
                        className={`px-3 py-1 text-sm rounded ${
                          page === i + 1
                            ? "bg-blue-600 text-white"
                            : "gradient-btn text-white hover:bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductSearch;
