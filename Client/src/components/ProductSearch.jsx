import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import SkeletonCard from "./SkeletonCard";

import ad from "../assets/AD.webp";
import Binary from "../assets/binary.png";
import SkyLand from "../assets/skyland.webp";

import { FaArrowUp, FaTriangleExclamation, FaXmark } from "react-icons/fa6";
import Card from "./Card";
import Loader from "./Loader";

const SUGGESTION_KEY = 'ppk‑suggestions';

const shopLogos = {
  Binary,
  SkyLand,
}

function loadSuggestions() {
  const raw = localStorage.getItem(SUGGESTION_KEY) ?? '[]';
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.warn('Corrupted suggestions, resetting');
    return [];
  }
}

const ProductSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shops, setShops] = useState(null);
  console.log("🚀 ~ ProductSearch ~ shops:", shops)
  const [error, setError] = useState(null);
  const [currentPages, setCurrentPages] = useState({});
  const [perPage, setPerPage] = useState(8);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false)
  const [sortedBy, setSortedBy] = useState("asc")

  useEffect(() => {
    const loaded = loadSuggestions();
    setSuggestions(loaded);
    if (loaded.length === 0) {
      localStorage.setItem(SUGGESTION_KEY, JSON.stringify([]));
    }
  }, []);

  const handleLocalStorageSearchSuggestion = () => {
    const val = inputValue.trim();
    if (!val) return;

    const stored = loadSuggestions();
    if (stored.includes(val)) return;

    const updated = [val, ...stored].slice(0, 5);
    setSuggestions(updated);
    localStorage.setItem(SUGGESTION_KEY, JSON.stringify(updated));
  };

  const handleResetSuggestions = () => {
    localStorage.setItem(SUGGESTION_KEY, JSON.stringify([]))
    setSuggestions([])
  }

  const handleSortByPrice = (selectedShop, type) => {
    setShops(prev => {
      const updated = [...prev]
      const matchedShop = updated.find(s => s.name === selectedShop.name)
      matchedShop.products.sort((a, b) => {
        // remove commas and non‑numeric chars 
        const cleanA = a.price.replace(/,/g, '').replace(/[^\d.]/g, '')
        const cleanB = b.price.replace(/,/g, '').replace(/[^\d.]/g, '')

        const priceA = parseFloat(cleanA)
        const priceB = parseFloat(cleanB)

        if (isNaN(priceA) || isNaN(priceB)) return 0
        console.log({ priceA, priceB })
        // ascending order
        if (type === 'asc') {
          return priceA - priceB
        } else {
          return priceB - priceA
        }
      })
      return updated
    })
  }

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
  }, []);

  useEffect(() => {
    const savedInput = localStorage.getItem("lastSearchInput");
    const savedResults = localStorage.getItem("lastSearchResults");
    const savedTime = localStorage.getItem("lastSearchTime");

    const isExpired =
      savedTime && Date.now() - parseInt(savedTime) > 30 * 60 * 1000; // 30 mins

    if (!isExpired && savedInput && savedResults) {
      setInputValue(savedInput);
      setSuggestions(loadSuggestions().filter(sug => sug.toLowerCase().includes(savedInput.trim().toLowerCase())))
      setShops(JSON.parse(savedResults));
    } else {
      localStorage.removeItem("lastSearchInput");
      localStorage.removeItem("lastSearchResults");
      localStorage.removeItem("lastSearchTime");
    }
  }, []);



  const handleSearch = async (input) => {
    setIsLoading(true);
    setShops(null);
    setError(null);

    handleLocalStorageSearchSuggestion();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/scrape/${input}`
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
      localStorage.setItem("lastSearchInput", input);
      localStorage.setItem("lastSearchResults", JSON.stringify(data));
      localStorage.setItem("lastSearchTime", Date.now().toString());
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsFocused(false);
    }
  };
  const clearSearch = () => {
    setInputValue("");
    setShops(null);
    localStorage.removeItem("lastSearchInput");
    localStorage.removeItem("lastSearchResults");
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
                autoComplete="off"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                type="search"
                value={inputValue}
                onChange={(e) => {
                  if (!isFocused) setIsFocused(true)
                  const val = e.target.value
                  setInputValue(val)
                  setSuggestions(loadSuggestions().filter(sug => sug.toLowerCase().includes(val.trim().toLowerCase())))
                }}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Khoj the Search..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 py-2 gradient-btn"
                onClick={() => handleSearch(inputValue)}
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? <Loader /> : "Search"}
              </button>
              <button
                type="button"
                className="text-gray-600 absolute end-24 bottom-5 text-sm"
                onClick={clearSearch}
                disabled={isLoading || !inputValue.trim()}
              >
                <FaXmark />
              </button>
            </div>
            {isFocused && suggestions.length > 0 ? <ul className="absolute z-50 mt-1 w-fit min-w-60 lg:min-w-96 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-b-lg shadow-lg">
              <div className="flex justify-between text-xs p-4 text-gray-500 font-thin">
                <p>Recent Search</p>
                {!isLoading && <button className="hover:text-white transition duration-200" disabled={isLoading} type="button" onClick={handleResetSuggestions}>Reset</button>}
              </div>
              {suggestions.map((suggestion) => (
                <li
                  onClick={() => {
                    if (isLoading) return;
                    setInputValue(suggestion)
                    handleSearch(suggestion)
                  }}
                  key={suggestion}
                  className={`px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${isLoading ? "pointer-events-none" : ""}`}
                >
                  {suggestion}
                </li>
              ))}
            </ul> : null}
          </form>
        </div>
        <a
          href="https://vibegaming.com.bd/"
          target="_blank"
          className="w-full h-full mt-4 rounded-lg"
        >
          <img
            src={ad}
            alt="Advertisement"
            className="rounded-lg w-full h-full object-contain "
          />
        </a>
        {/* <div className="flex text-red-500 items-center mt-1 md:text-xs text-[9px]">
          <FaCircleInfo className="mr-2" />
          Try to provide an accurate product name for better search results.
        </div> */}
        {error && (
          <div className="flex text-yellow-600 items-center mt-1 md:text-xs text-[9px]">
            <FaTriangleExclamation className="mr-2" />
            {error}
          </div>
        )}
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
          <div className="flex items-center justify-end mt-4 space-x-4 md:space-y-0 space-y-4 flex-wrap">
            <label className="text-sm font-medium text-gray-500">
              Price Range
            </label>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="no-spinner px-2 py-1 text-sm border rounded w-28"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="no-spinner px-2 py-1 text-sm border rounded w-28"
            />
            <label className="text-sm font-medium text-gray-500">
              In Stock
            </label>
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
          {shops.map((shop, shopIndex) => {
            const extractNumbersFromString = (str) => {
              const regex = /[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/g;
              const matches = String(str).match(regex); // Force str into a string
              if (matches && matches.length > 0) {
                const lastMatch = matches[matches.length - 1];
                const numericString = lastMatch.replace(/,/g, "");
                return parseFloat(numericString);
              } else {
                return 0;
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
              <div
                key={shopIndex}
                className={`${shopIndex !== 0 ? "my-8" : ""}`}
              >
                <div className="flex items-center justify-between space-x-3 mb-4">
                  <img
                    src={shop.name in shopLogos ? shopLogos[shop.name] : shop.logo}
                    alt={shop.name}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex gap-2">
                    {shop?.products?.length > 0 && <button onClick={() => {
                      setSortedBy(prev => prev === 'asc' ? 'desc' : 'asc')
                      handleSortByPrice(shop, sortedBy)
                    }} className="text-white font-medium text-xs flex items-center gap-2 gradient-btn rounded px-2">Price <FaArrowUp className={`${sortedBy === 'asc' ? "rotate-0" : "rotate-180"} transition duration-200`} /></button>}
                    {shop?.products?.length ? <p className="font-medium text-gray-500">{shop?.products?.length} {shop?.products?.length > 1 ? "products" : "product"}</p> : null}
                  </div>
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
                        className={`px-3 py-1 text-sm rounded ${page === i + 1
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
