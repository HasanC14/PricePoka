import { useState } from "react";
import Binary from "../assets/binary.png";
import StarTech from "../assets/startech.png";
import Ryans from "../assets/rayans.svg";
import PCHouse from "../assets/pchousew.webp";
import TechLand from "../assets/techland.webp";
import Ultra from "../assets/ultra.webp";
import { FaCircleInfo } from "react-icons/fa6";

const extractNumbersFromString = (str) => {
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
  const [loadingGif, setLoadingGif] = useState("");

  const gifUrls = [
    "https://giphy.com/embed/rIpm4UI7pv7WFiSm4s",
    "https://giphy.com/embed/ZXf6dCfo4h9br1PMEQ",
    "https://giphy.com/embed/RIwWQuRrVJLC4AB5Ik",
    "https://giphy.com/embed/ghbSg8kaE3U15aD2cp",
    "https://giphy.com/embed/gIzLZvcPFQyeQd4oRY",
    "https://giphy.com/embed/9itja4ux9fpFTSu7le ",
    "https://giphy.com/embed/l2Rno9dUdSVxorDj2",
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    setLoadingGif(gifUrls[Math.floor(Math.random() * gifUrls.length)]);
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
      <div className="flex text-red-500 items-center">
        <FaCircleInfo className="mr-2" /> Please provide a accurate product name
        for better results.
      </div>
      <div className="flex items-center">
        <div className="bg-white p-4 rounded-lg">
          <div className="relative bg-inherit">
            <input
              type="text"
              id="search"
              name="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
              placeholder="Type inside me"
            />

            <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
              Search
            </label>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <iframe
            src={loadingGif}
            width="480"
            height="271"
            style={{ border: "none" }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="Loading"
          ></iframe>
        </div>
      )}

      {products && (
        <div className="mt-8">
          {Object.keys(products).map((shop) => (
            <div key={shop} className="mb-8">
              {shop === "Binary" && (
                <img src={Binary} alt={shop} className="w-20" />
              )}
              {shop === "StarTech" && (
                <img src={StarTech} alt={shop} className="w-20" />
              )}
              {shop === "Ryans" && (
                <img src={Ryans} alt={shop} className="w-20" />
              )}
              {shop === "PC House" && (
                <img src={PCHouse} alt={shop} className="w-20" />
              )}
              {shop === "TechLand" && (
                <img src={TechLand} alt={shop} className="w-20 bg-black p-3" />
              )}
              {shop === "Ultra Technology" && (
                <img src={Ultra} alt={shop} className="w-20" />
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
