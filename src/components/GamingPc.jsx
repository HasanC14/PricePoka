import { useEffect, useState } from "react";
import SearchBar from "./SearchBox2";
import SkeletonCard from "./SkeletonCard";
import Card from "./Card";
import { Range } from "react-range";
import { StaggerChildren } from "./StaggerChildren";
import { LuFilter } from "react-icons/lu";

const GamingPc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);

  // Manage filter visibility (for mobile)
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShops, setSelectedShops] = useState([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 400000]); // adjust max as needed

  // New CPU build filters
  const [filterAMD, setFilterAMD] = useState(false);
  const [filterIntel, setFilterIntel] = useState(false);

  // Sorting and Pagination
  const [sortOrders, setSortOrders] = useState({});
  const [currentPages, setCurrentPages] = useState({});

  // Derived suggestions from all product names
  const allProductNames = shops.flatMap((shop) =>
    (shop.products || []).map((p) => p.name)
  );

  // Filtered suggestions (max 5)
  const suggestions = searchTerm
    ? allProductNames.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_FOR_PC}/gaming-pc`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.success) {
          const shopsData = Object.entries(data.data).map(([name, val]) => ({
            name,
            logo: val.logo,
            products: val.products,
          }));
          setShops(shopsData);
          setSelectedShops(shopsData.map((shop) => shop.name));
        } else {
          setError("Failed to load data");
        }
      } catch (e) {
        setError(e.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const extractPrice = (priceString) => {
    const match = String(priceString)?.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
    return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
  };

  const toggleShop = (shopName) => {
    if (selectedShops.includes(shopName)) {
      setSelectedShops(selectedShops.filter((s) => s !== shopName));
    } else {
      setSelectedShops([...selectedShops, shopName]);
    }
  };

  const handleInputChange = (e, index) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) return;
    if (index === 0)
      setPriceRange([Math.min(val, priceRange[1]), priceRange[1]]);
    else setPriceRange([priceRange[0], Math.max(val, priceRange[0])]);
  };

  return (
    <div className="px-4 py-8 grid grid-cols-12 gap-6 max-w-7xl w-full mx-auto dark:text-gray-100">
      {/* Search bar */}
      <SearchBar onSearch={setSearchTerm} suggestions={suggestions} />

      {/* 2-column layout: Sidebar + Products */}
      <div className="grid grid-cols-12 col-span-12 gap-6 w-full">
        {/* Sidebar */}
        <div
          className={`col-span-12 md:col-span-3 fixed -top-2 right-0 dark:bg-[#020817] p-6 transition-transform duration-300 ease-in-out md:relative open ${
            showFilters
              ? "transform translate-x-0 "
              : "transform translate-x-full "
          } md:translate-x-0 md:block`}
        >
          <div className="md:sticky top-24 space-y-6">
            {/* Company filter */}
            <div>
              <h4 className="font-semibold mb-2">Company</h4>
              <ul className="space-y-2">
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
                  value={priceRange[0]}
                  onChange={(e) => handleInputChange(e, 0)} // Update min price on change
                  className="border p-2 md:w-20 w-16 rounded dark:bg-[#020817] dark:border dark:border-[#1e293b]"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handleInputChange(e, 1)} // Update max price on change
                  className="border p-2 md:w-20 w-16 rounded dark:bg-[#020817] dark:border dark:border-[#1e293b]"
                />
              </div>

              {/* Range Slider */}
              <Range
                step={1000}
                min={0}
                max={400000}
                values={priceRange}
                onChange={setPriceRange}
                renderTrack={({ props, children }) => {
                  const trackStyle = {
                    position: "relative",
                    width: "100%",
                    height: "3px",
                    background: `linear-gradient(to right, #3b82f6 ${(
                      (priceRange[0] / 400000) *
                      100
                    ).toFixed(2)}%, #e5e7eb ${(
                      (priceRange[1] / 400000) *
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
                  checked={showInStockOnly}
                  onChange={() => setShowInStockOnly(!showInStockOnly)}
                />
                <label>In Stock Only</label>
              </div>
            </div>

            {/* CPU Build Filter */}
            <div>
              <h4 className="font-semibold mb-2">CPU Build</h4>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filterAMD}
                    onChange={() => setFilterAMD(!filterAMD)}
                  />
                  <span>AMD Build</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filterIntel}
                    onChange={() => setFilterIntel(!filterIntel)}
                  />
                  <span>Intel Build</span>
                </label>
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
            <div className="col-span-12 text-center text-gray-500" key={shops}>
              No products found.
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
                .map((shop) => {
                  // Filter products by search term, availability, price, and CPU build
                  let filteredProducts = (shop.products || []).filter(
                    (product) => {
                      const price = extractPrice(product.price);
                      const nameLower = product.name.toLowerCase();
                      const matchesSearch = product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                      const inStock = !showInStockOnly || price > 0;
                      const aboveMin = price >= priceRange[0];
                      const belowMax = price <= priceRange[1];
                      const matchesCpu =
                        (!filterAMD && !filterIntel) ||
                        (filterAMD && nameLower.includes("amd")) ||
                        (filterIntel && nameLower.includes("intel"));
                      return (
                        matchesSearch &&
                        inStock &&
                        aboveMin &&
                        belowMax &&
                        matchesCpu
                      );
                    }
                  );

                  // Sorting
                  const sortOrder = sortOrders[shop.name] || "default";
                  if (sortOrder === "price-asc") {
                    filteredProducts.sort(
                      (a, b) => extractPrice(a.price) - extractPrice(b.price)
                    );
                  } else if (sortOrder === "price-desc") {
                    filteredProducts.sort(
                      (a, b) => extractPrice(b.price) - extractPrice(a.price)
                    );
                  }

                  // Pagination
                  const isMobile = window.innerWidth < 768;
                  const page = currentPages[shop.name] || 1;
                  const perPage = isMobile ? 8 : 12;
                  const totalPages = Math.ceil(
                    filteredProducts.length / perPage
                  );
                  const paginatedProducts = filteredProducts.slice(
                    (page - 1) * perPage,
                    page * perPage
                  );

                  if (!filteredProducts.length) return null;

                  return (
                    <div key={shop.name} className="mb-12">
                      {/* Shop header with logo */}
                      <div className="flex md:items-center justify-between mb-4 md:flex-row flex-col">
                        {shop.logo && (
                          <>
                            <img
                              src={shop.logo}
                              alt={`${shop.name} logo`}
                              className={`h-10 w-14 object-contain ${
                                shop.name.includes("TechLand")
                                  ? "bg-black px-1"
                                  : ""
                              }`}
                            />
                            <div className="flex items-center space-x-4 justify-between">
                              {paginatedProducts.length ? (
                                <p className="md:text-md text-xs text-gray-500">
                                  Showing {paginatedProducts.length} of{" "}
                                  {filteredProducts.length}{" "}
                                  {paginatedProducts.length > 1
                                    ? "products"
                                    : "product"}
                                </p>
                              ) : null}
                              {filteredProducts.length > 0 && (
                                <select
                                  value={sortOrders[shop.name] || "default"}
                                  onChange={(e) =>
                                    setSortOrders((prev) => ({
                                      ...prev,
                                      [shop.name]: e.target.value,
                                    }))
                                  }
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

                      {/* Products grid */}
                      <StaggerChildren
                        direction="up"
                        staggerDelay={0.15}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                      >
                        {paginatedProducts.map((product, i) => (
                          <Card key={i} product={product} />
                        ))}
                      </StaggerChildren>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center mt-4 gap-2 flex-wrap">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                setCurrentPages((prev) => ({
                                  ...prev,
                                  [shop.name]: i + 1,
                                }))
                              }
                              className={`px-3 py-1 border text-gray-500 dark:border-[#1e293b] rounded-full ${
                                page === i + 1
                                  ? "bg-blue-600 text-white"
                                  : "hover:bg-blue-600 hover:text-white"
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

export default GamingPc;
