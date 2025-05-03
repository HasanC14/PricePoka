import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import Card from "./Card";
import Loader from "./Loader";
import { Range } from "react-range";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get("query") || "";
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Manage filter visibility

  // Filters
  const [selectedShops, setSelectedShops] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [values, setValues] = useState([0, 389000]); // Min and Max values
  const [minPrice, maxPrice] = values;

  // Pagination state
  const [currentPages, setCurrentPages] = useState({});

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/scrape/${searchInput}`
      );
      if (!response.ok) {
        throw new Error("Fetch failed");
      }
      const data = await response.json();
      setShops(data);
      const shopNames = data.map((shop) => shop.name);
      setSelectedShops(shopNames); // Select all shops initially
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
  };

  const toggleShop = (shopName) => {
    if (selectedShops.includes(shopName)) {
      setSelectedShops(selectedShops.filter((name) => name !== shopName));
    } else {
      setSelectedShops([...selectedShops, shopName]);
    }
  };

  const extractPrice = (priceString) => {
    const match = String(priceString)?.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
    return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
  };

  const handleInputChange = (e, index) => {
    let newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;

    if (index === 0) {
      // Min value
      setValues([Math.min(newValue, maxPrice), maxPrice]);
    } else {
      // Max value
      setValues([minPrice, Math.max(newValue, minPrice)]);
    }
  };

  return (
    <div className="px-4 py-8 grid grid-cols-12 gap-6 max-w-7xl w-full mx-auto ">
      {/* Search bar at the very top */}
      <form className="col-span-12" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative ">
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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2 bottom-[.6rem] bg-blue-600 hover:bg-blue-800 font-medium rounded-sm text-xl px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? <Loader /> : "Search"}
          </button>
        </div>
      </form>

      {/* 2-column layout: Sidebar + Products */}
      <div className="grid grid-cols-12 col-span-12 gap-6 w-full">
        {/* Sidebar */}
        <div
          className={`col-span-12 md:col-span-3 fixed top-0 right-0 bg-white p-6 transition-transform duration-300 ease-in-out md:relative open ${
            showFilters
              ? "transform translate-x-0 "
              : "transform translate-x-full "
          } md:translate-x-0 md:block`}
        >
          <div className="md:sticky top-24 space-y-6">
            {/* Filters go here... */}
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {shops.map((shop, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedShops.includes(shop.name)}
                      onChange={() => toggleShop(shop.name)}
                    />
                    <label>{shop.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-semibold mb-2">Price</h4>
              <div className="flex justify-between mb-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => handleInputChange(e, 0)} // Update min price on change
                  className="border p-2 md:w-20 w-16 rounded"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => handleInputChange(e, 1)} // Update max price on change
                  className="border p-2 md:w-20 w-16 rounded"
                />
              </div>

              {/* Range Slider */}
              <Range
                step={1000}
                min={0}
                max={389000}
                values={values}
                onChange={(values) => setValues(values)} // Update price when slider is changed
                renderTrack={({ props, children }) => (
                  <div {...props} className="w-full h-2 bg-gray-300 rounded-md">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-6 h-6 rounded-full bg-blue-600 cursor-pointer"
                  />
                )}
              />
            </div>

            {/* Availability Filter */}
            <div>
              <h4 className="font-semibold mb-2">Availability</h4>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={() => setShowInStockOnly(!showInStockOnly)}
                />
                <label>In Stock Only</label>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Button for Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-20"
        >
          Filter
        </button>

        {/* Product Section */}
        <div className="col-span-12 md:col-span-9 w-full">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {shops.length === 0 && !isLoading && (
            <div className="col-span-12 text-center text-gray-500">
              No products found for this search.
            </div>
          )}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              {shops
                .filter((shop) => selectedShops.includes(shop.name))
                .map((shop, idx) => {
                  const products = (shop.products || []).filter((product) => {
                    const price = extractPrice(product.price);
                    const inStock = !showInStockOnly || price > 0;
                    const aboveMin = !minPrice || price >= parseFloat(minPrice);
                    const belowMax = !maxPrice || price <= parseFloat(maxPrice);
                    return inStock && aboveMin && belowMax;
                  });

                  const isMobile = window.innerWidth < 768;
                  const page = currentPages[shop.name] || 1;
                  const perPage = isMobile ? 6 : 8;
                  const totalPages = Math.ceil(products.length / perPage);
                  const paginatedProducts = products.slice(
                    (page - 1) * perPage,
                    page * perPage
                  );

                  if (!products.length) return null;

                  return (
                    <div key={idx} className="mb-12">
                      {/* Shop Logo */}
                      <div className="flex items-center justify-between space-x-3  mb-4">
                        {shop.logo && (
                          <>
                            <img
                              src={shop.logo}
                              alt={shop.name}
                              className="h-10 w-14 object-contain"
                            />
                            {paginatedProducts?.length ? (
                              <p className="font-medium text-gray-500">
                                Showing {paginatedProducts?.length} of{" "}
                                {shop?.products?.length}{" "}
                                {paginatedProducts?.length > 1
                                  ? "products"
                                  : "product"}
                              </p>
                            ) : null}
                          </>
                        )}
                      </div>

                      {/* Products */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {paginatedProducts.map((product, i) => (
                          <Card key={i} product={product} />
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center mt-4 gap-2">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                setCurrentPages((prev) => ({
                                  ...prev,
                                  [shop.name]: i + 1,
                                }))
                              }
                              className={`px-3 py-1 border rounded-full ${
                                page === i + 1
                                  ? "bg-blue-600 text-white"
                                  : "hover:bg-blue-100"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
