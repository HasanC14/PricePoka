import { useState, useEffect } from "react";

const SearchBox = ({ onSearch, recentSearches }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSearches, setFilteredSearches] = useState([]);

  // Filter recent searches based on user input
  useEffect(() => {
    const matches = recentSearches.filter((term) =>
      term.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSearches(matches);
  }, [inputValue, recentSearches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue); // Trigger the search
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex mb-8">
        <input
          type="text"
          className="flex-1 p-3 border rounded-l-lg"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r-lg"
        >
          Search
        </button>
      </form>

      {/* Recent Searches dropdown */}
      {filteredSearches.length > 0 && inputValue && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="p-2 max-h-64 overflow-y-auto">
            <ul>
              {filteredSearches.map((term, idx) => (
                <li
                  key={idx}
                  className="py-2 px-4 text-gray-700 cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => onSearch(term)} // Trigger search on click
                >
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
