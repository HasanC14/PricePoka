import { useEffect, useState } from "react";
import { Range } from "react-range";
import { useLocation } from "react-router-dom";
import binary from "../assets/binary.png";
import skyland from "../assets/skyland.jpg";
import Card from "./Card";
import SearchBar from "./SearchBox";
import SkeletonCard from "./SkeletonCard";
import { StaggerChildren } from "./StaggerChildren";
import { LuFilter } from "react-icons/lu";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery().get("query") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  // Manage filter visibility
  const [showFilters, setShowFilters] = useState(false);

  const [sortOrders, setSortOrders] = useState({});
  // Filters
  const [selectedShops, setSelectedShops] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  // Min and Max values
  const [values, setValues] = useState([0, 389000]);
  const [minPrice, maxPrice] = values;

  // Pagination state
  const [currentPages, setCurrentPages] = useState({});

  useEffect(() => {
    if (query) {
      const cachedData = localStorage.getItem(query); // Check if search results are cached
      if (cachedData) {
        setShops(JSON.parse(cachedData)); // Use cached data
        const cachedShops = JSON.parse(cachedData);
        const shopNames = cachedShops.map((shop) => shop.name);
        setSelectedShops(shopNames); // Set selected shops from cached data
      } else {
        handleSearch(query); // If no cached data, fetch from API
      }
    }
  }, [query]);

  const handleSearch = async (searchInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LOCAL_URL}/scrape/${searchInput}`
      );
      if (!response.ok) {
        throw new Error("Fetch failed");
      }
      const data = await response.json();
      setShops(data);

      // Create an array of shop names and update the selectedShops state
      const shopNames = data.map((shop) => shop.name);
      setSelectedShops(shopNames);

      // Store the fetched data in localStorage
      localStorage.setItem(searchInput, JSON.stringify(data));

      // Update recent searches in localStorage
      updateRecentSearches(searchInput);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecentSearches = (searchInput) => {
    // Get the current timestamp
    const now = Date.now();

    // Clear localStorage if more than 1 day has passed
    const lastUpdated = localStorage.getItem("lastUpdated");
    if (lastUpdated && now - lastUpdated > 24 * 60 * 60 * 1000) {
      localStorage.clear();
    }

    // Get the current recent searches from localStorage (or initialize as an empty array)
    const recentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];

    // Remove the search input if it already exists to avoid duplicates
    const filteredSearches = recentSearches.filter(
      (item) => item !== searchInput
    );

    // Add the new search at the start
    filteredSearches.unshift(searchInput);

    // Limit the array to the last 5 searches
    const limitedSearches = filteredSearches.slice(0, 5);

    // Store the updated list of recent searches in localStorage
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));

    // Update the timestamp of the last time the search history was updated
    localStorage.setItem("lastUpdated", now);
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
      setValues([Math.min(newValue, maxPrice), maxPrice]);
    } else {
      setValues([minPrice, Math.max(newValue, minPrice)]);
    }
  };
  // max how many numbered buttons to show (excluding Prev/Next)
  const MAX_BUTTONS = 5;

  // Build a compact list of page items: [1, '…', 7, 8, 9, '…', 20]
  function getPageItems(current, total, maxButtons = MAX_BUTTONS) {
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const items = [];
    const first = 1;
    const last = total;

    // Start with a small window around the current page
    let left = Math.max(2, current - 1);
    let right = Math.min(total - 1, current + 1);

    // Expand the window until we fill maxButtons - 2 (excluding first & last)
    while (right - left + 1 < maxButtons - 2) {
      if (left > 2) left--;
      else if (right < total - 1) right++;
      else break;
    }

    items.push(first);
    if (left > 2) items.push("…");
    for (let i = left; i <= right; i++) items.push(i);
    if (right < total - 1) items.push("…");
    items.push(last);

    return items;
  }

  return (
    <div className="px-4 py-8 grid grid-cols-12 gap-6 max-w-7xl w-full mx-auto dark:text-gray-100">
      {/* Search bar */}
      <SearchBar />

      {/* 2-column layout: Sidebar + Products */}
      <div className="grid grid-cols-12 col-span-12 gap-6 w-full">
        {/* Sidebar */}
        <div
          className={`col-span-12 md:col-span-3 fixed -top-2 right-0  dark:bg-[#020817] p-6 transition-transform duration-300 ease-in-out md:relative open ${
            showFilters
              ? "transform translate-x-0 "
              : "transform translate-x-full "
          } md:translate-x-0 md:block`}
        >
          <div className="md:sticky top-24 space-y-6">
            {/* Filters go here... */}
            <div className="">
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-2 ">
                {shops.map((shop, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`checkbox-${shop.name}`}
                        checked={selectedShops.includes(shop.name)}
                        onChange={() => toggleShop(shop.name)}
                      />
                      <label
                        htmlFor={`checkbox-${shop.name}`}
                        className="checkbox-label"
                      ></label>
                    </div>
                    <label
                      htmlFor={`checkbox-${shop.name}`}
                      className="text-sm"
                    >
                      {shop.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="font-semibold mb-2">Price</h4>
              <div className="flex justify-between mb-4">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => handleInputChange(e, 0)} // Update min price on change
                  className="border p-2 md:w-20 w-16 rounded dark:bg-[#020817] dark:border dark:border-[#1e293b]"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => handleInputChange(e, 1)} // Update max price on change
                  className="border p-2 md:w-20 w-16 rounded dark:bg-[#020817] dark:border dark:border-[#1e293b]"
                />
              </div>

              {/* Range Slider */}
              <Range
                step={1000}
                min={0}
                max={389000}
                values={values}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => {
                  const trackStyle = {
                    position: "relative",
                    width: "100%",
                    height: "3px",
                    background: `linear-gradient(to right, #3b82f6 ${(
                      (values[0] / 389000) *
                      100
                    ).toFixed(2)}%, #e5e7eb ${(
                      (values[1] / 389000) *
                      100
                    ).toFixed(2)}%)`,
                    borderRadius: "9999px",
                  };
                  return (
                    <div {...props} className="w-full" style={trackStyle}>
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-4 h-4 rounded-full bg-white border-4 border-blue-600 cursor-pointer"
                    style={{
                      boxSizing: "border-box",
                      position: "absolute",
                      top: "-2px",
                    }}
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
                  className=""
                  checked={showInStockOnly}
                  onChange={() => setShowInStockOnly(!showInStockOnly)}
                />
                <label className="">In Stock Only</label>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Button for Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden fixed bottom-20 right-6 bg-blue-600 text-white p-4 rounded-md shadow-lg z-20"
        >
          <LuFilter className="2xl" />
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
                  let products = (shop.products || []).filter((product) => {
                    const price = extractPrice(product.price);
                    const inStock = !showInStockOnly || price > 0;
                    const aboveMin = !minPrice || price >= parseFloat(minPrice);
                    const belowMax = !maxPrice || price <= parseFloat(maxPrice);
                    return inStock && aboveMin && belowMax;
                  });

                  const currentShopSortOrder =
                    sortOrders[shop.name] || "default";

                  if (currentShopSortOrder === "price-asc") {
                    products.sort(
                      (a, b) => extractPrice(a.price) - extractPrice(b.price)
                    );
                  } else if (currentShopSortOrder === "price-desc") {
                    products.sort(
                      (a, b) => extractPrice(b.price) - extractPrice(a.price)
                    );
                  }

                  // The rest of your existing code for pagination will use the sorted 'products'
                  const isMobile = window.innerWidth < 768;
                  const page = currentPages[shop.name] || 1;
                  const perPage = isMobile ? 6 : 8;
                  const totalPages = Math.ceil(products.length / perPage);
                  const paginatedProducts = products.slice(
                    (page - 1) * perPage,
                    page * perPage
                  );

                  if (!products.length) return null;

                  const staggerKey = `${shop.name}-page-${page}-sort-${currentShopSortOrder}-count-${paginatedProducts.length}`;

                  return (
                    <div key={idx} className="mb-12">
                      {/* Shop Logo */}
                      <div className="flex md:items-center justify-between  mb-4 md:flex-row flex-col">
                        {shop.logo && (
                          <>
                            <img
                              src={
                                shop.name.includes("SkyLand")
                                  ? skyland
                                  : shop.name.includes("Binary")
                                  ? binary
                                  : shop.logo
                              }
                              alt={shop.name}
                              className={`  h-10 w-14 object-contain ${
                                shop.name.includes("TechLand")
                                  ? "bg-black px-1"
                                  : ""
                              }`}
                            />
                            <div className="flex items-center space-x-4 justify-between">
                              {" "}
                              {/* Existing div */}
                              {paginatedProducts?.length ? (
                                <p className="md:text-md text-xs text-gray-500">
                                  Showing {paginatedProducts?.length} of{" "}
                                  {shop?.products?.length}{" "}
                                  {paginatedProducts?.length > 1
                                    ? "products"
                                    : "product"}{" "}
                                </p>
                              ) : null}
                              {/* Updated Sort Dropdown */}
                              {products.length > 0 && (
                                <select
                                  value={sortOrders[shop.name] || "default"} // Get sort order for the current shop
                                  onChange={(e) => {
                                    const newSortOrder = e.target.value;
                                    setSortOrders((prevSortOrders) => ({
                                      ...prevSortOrders,
                                      [shop.name]: newSortOrder, // Set sort order for the specific shop
                                    }));
                                    setCurrentPages((prev) => ({
                                      ...prev,
                                      [shop.name]: 1,
                                    }));
                                  }}
                                  className="p-2 border border-gray-300 rounded-md text-sm dark:bg-[#020817] dark:border-[#1e293b]"
                                >
                                  <option value="default">Sort by</option>
                                  <option value="price-asc">
                                    Price: Low to High
                                  </option>
                                  <option value="price-desc">
                                    Price: High to Low
                                  </option>
                                </select>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Products */}
                      <StaggerChildren
                        key={staggerKey}
                        direction="up"
                        staggerDelay={0.15}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                      >
                        {paginatedProducts.map((product, i) => (
                          <Card key={product.id || i} product={product} />
                        ))}
                      </StaggerChildren>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center mt-4 gap-2 items-center">
                          {/* Prev */}
                          <button
                            onClick={() =>
                              setCurrentPages((prev) => ({
                                ...prev,
                                [shop.name]: Math.max(1, page - 1),
                              }))
                            }
                            disabled={page === 1}
                            className={`px-3 py-1 border text-gray-500 dark:border-[#1e293b] rounded-full ${
                              page === 1
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-600 hover:text-white"
                            }`}
                          >
                            Prev
                          </button>

                          {/* Numbered buttons with ellipsis */}
                          {getPageItems(page, totalPages).map((item, i) =>
                            item === "…" ? (
                              <span
                                key={`ellipsis-${i}`}
                                className="px-3 py-1 text-gray-500"
                              >
                                …
                              </span>
                            ) : (
                              <button
                                key={`pg-${item}`}
                                onClick={() =>
                                  setCurrentPages((prev) => ({
                                    ...prev,
                                    [shop.name]: item,
                                  }))
                                }
                                className={`px-3 py-1 border text-gray-500 dark:border-[#1e293b] rounded-full ${
                                  page === item
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-blue-600 hover:text-white"
                                }`}
                              >
                                {item}
                              </button>
                            )
                          )}

                          {/* Next */}
                          <button
                            onClick={() =>
                              setCurrentPages((prev) => ({
                                ...prev,
                                [shop.name]: Math.min(totalPages, page + 1),
                              }))
                            }
                            disabled={page === totalPages}
                            className={`px-3 py-1 border text-gray-500 dark:border-[#1e293b] rounded-full ${
                              page === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-600 hover:text-white"
                            }`}
                          >
                            Next
                          </button>
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
