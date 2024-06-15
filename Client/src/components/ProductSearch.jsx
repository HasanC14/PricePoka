import { useState } from "react";
import Binary from "../assets/binary.png";
import StarTech from "../assets/startech.png";
import Ryans from "../assets/rayans.svg";
import PCHouse from "../assets/pchousew.webp";
import TechLand from "../assets/techland.webp";
const extractNumbersFromString = (str) => {
  // Match digits, optional commas, and optional decimal point
  const regex = /[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/g;
  const matches = str.match(regex);

  if (matches && matches.length > 0) {
    // Return the last match found (assuming it's the main numeric value)
    const lastMatch = matches[matches.length - 1];
    const numericString = lastMatch.replace(/,/g, ""); // Remove commas
    return parseFloat(numericString); // Parse to float
  } else {
    return "Out Of Stock"; // Return NaN if no numeric value found
  }
};
const ProductSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/scrape?product=${inputValue}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <img src={Binary} alt="" /> */}
      <div className="flex items-center">
        <input
          type="text"
          className="border border-gray-300 p-2 mr-2"
          placeholder="Enter product name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}

      {products && (
        <div className="mt-8">
          {Object.keys(products).map((shop) => (
            <div key={shop} className="mb-8">
              {shop === "Binary" && (
                <img src={Binary} alt={shop} className="size-10 rounded-full" />
              )}
              {shop === "StarTech" && (
                <img
                  src={StarTech}
                  alt={shop}
                  className="size-10 rounded-full"
                />
              )}
              {shop === "Ryans" && (
                <img src={Ryans} alt={shop} className="size-10 rounded-full" />
              )}
              {shop === "PC House" && (
                <img
                  src={PCHouse}
                  alt={shop}
                  className="size-10 rounded-full"
                />
              )}
              {shop === "'TechLand'" && (
                <img
                  src={TechLand}
                  alt={shop}
                  className="size-10 rounded-full"
                />
              )}
              <h2 className="text-xl mb-4">{shop}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products[shop].map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <h6 className="text-xl mb-4">{product?.name}</h6>
                    <img
                      src={product?.img}
                      alt={product?.price}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-lg font-semibold mb-2">
                        {extractNumbersFromString(product?.price) == 0
                          ? "Out Of Stock"
                          : extractNumbersFromString(product?.price)}
                      </p>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Product
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
