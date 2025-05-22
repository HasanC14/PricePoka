import React, { useState, useEffect, useRef } from "react";

const SearchBox2 = ({ onSearch, suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const debounceTimeout = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce input changes
  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onSearch(val);
      setDropdownVisible(val.length > 0);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setDropdownVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    // Optionally you can call onSearch or trigger a navigate here
    // For real-time filtering, onSearch already triggered on input change
  };

  return (
    <form
      autoComplete="off"
      className="col-span-12 max-w-7xl mx-auto w-full"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="search-input"
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
          id="search-input"
          className="block w-full md:p-6 p-4 md:ps-12 ps-9 md:text-sm text-xs text-gray-900 dark:text-gray-100 border border-gray-300 rounded-md focus:ring-blue-500 dark:bg-[#020817] dark:border dark:border-[#1e293b]"
          placeholder="Khoj the search..."
          value={inputValue}
          onChange={handleChange}
          onFocus={() => inputValue && setDropdownVisible(true)}
          ref={inputRef}
          autoComplete="off"
        />
        <button
          type="submit"
          className="text-white absolute right-2 md:bottom-[.6rem] bottom-[.4rem] bg-blue-600 hover:bg-blue-800 font-medium rounded-sm md:text-xl text-sm md:px-8 px-4 md:py-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>

        {dropdownVisible && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 bg-white dark:bg-[#020817] dark:border dark:border-[#1e293b] text-gray-500 shadow-md w-full mt-1 rounded-md max-h-60 overflow-y-auto"
          >
            <ul className="py-4">
              {suggestions.slice(0, 5).map((suggestion, idx) => (
                <li
                  key={idx}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer px-4 py-2 md:text-sm text-xs hover:bg-blue-100 dark:hover:bg-gray-900"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBox2;
