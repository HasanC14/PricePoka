import { useEffect, useState } from "react";

const RecentSearches = ({ onSearch }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Fetch recent searches from localStorage
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleClick = (searchTerm) => {
    onSearch(searchTerm); // Trigger search with clicked term
  };

  return (
    <div className="mt-4 space-y-2">
      {recentSearches.length > 0 && (
        <div>
          <h5 className="font-semibold text-gray-600">Recent Searches</h5>
          <ul className="space-y-1">
            {recentSearches.map((term, idx) => (
              <li
                key={idx}
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleClick(term)}
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
