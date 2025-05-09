import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader"; // Assuming you have a Loader component

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchInput) => {
    setIsLoading(true);
    try {
      updateRecentSearches(searchInput);
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSearch(inputValue);
  };

  const updateRecentSearches = (searchInput) => {
    const now = Date.now();
    const lastUpdated = localStorage.getItem("lastUpdated");

    if (lastUpdated && now - lastUpdated > 24 * 60 * 60 * 1000) {
      localStorage.clear();
    }

    const recentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    const filteredSearches = recentSearches.filter(
      (item) => item !== searchInput
    );
    filteredSearches.unshift(searchInput);
    const limitedSearches = filteredSearches.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
    localStorage.setItem("lastUpdated", now);
  };

  return (
    <form
      className="col-span-12 max-w-7xl mx-auto w-full"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center md:ps-3 ps-1 pointer-events-none">
          <svg
            className="md:w-4 md:h-4 w-3 h-3 text-gray-500 dark:text-gray-400"
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
          id="default-search"
          className="block w-full md:p-6 p-4 md:ps-12 ps-9 md:text-sm text-xs text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Khoj the search..."
          required
          value={inputValue}
          onFocus={() => setDropdownVisible(true)}
          onChange={(e) => setInputValue(e.target.value)}
          ref={searchInputRef}
        />
        <button
          type="submit"
          className="text-white absolute right-2 md:bottom-[.6rem] bottom-[.4rem] bg-blue-600 hover:bg-blue-800 font-medium rounded-sm md:text-xl text-sm md:px-8 px-4 md:py-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? <Loader /> : "Search"}
        </button>

        {dropdownVisible && recentSearches.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 bg-white shadow-md w-full mt-1 rounded-md max-h-60 overflow-y-auto"
          >
            <ul className="py-4">
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  onClick={() => setInputValue(search)}
                  className="cursor-pointer px-4 py-2 md:text-sm text-xs hover:bg-blue-100"
                >
                  {search}
                </li>
              ))}
            </ul>
            <button
              onClick={() => localStorage.clear()}
              className="absolute z-10 top-1 right-4 text-blue-600 hover:underline md:text-sm text-xs"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
