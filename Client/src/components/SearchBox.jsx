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
      //  const response = await fetch(
      //   `<span class="math-inline">\{import\.meta\.env\.VITE\_API\_BASE\_URL\}/scrape/</span>{searchInput}`
      // );
      // if (!response.ok) {
      //   throw new Error("Fetch failed");
      // }
      // const data = await response.json();
      // setShops(data);

      // localStorage.setItem(searchInput, JSON.stringify(data));

      updateRecentSearches(searchInput);
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`); // Navigate on search
    } catch (err) {
      console.error("Fetch error:", err);
      //  setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSearch(inputValue);
    // navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
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
        <div className="absolute inset-y-0 left-3 flex items-center ps-3 pointer-events-none">
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
          id="default-search"
          className="block w-full p-6 ps-12 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Khoj the search..."
          required
          value={inputValue}
          onFocus={() => setDropdownVisible(true)}
          onChange={(e) => setInputValue(e.target.value)}
          ref={searchInputRef}
        />
        <button
          type="submit"
          className="text-white absolute right-2 bottom-[.6rem] bg-blue-600 hover:bg-blue-800 font-medium rounded-sm text-xl px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-100"
                >
                  {search}
                </li>
              ))}
            </ul>
            <button
              onClick={() => localStorage.clear()}
              className="absolute z-10 top-1 right-4 text-blue-600 hover:underline"
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
