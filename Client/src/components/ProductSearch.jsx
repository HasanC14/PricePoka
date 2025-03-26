import { useState } from "react";

import Binary from "../assets/binary.png";
import StarTech from "../assets/startech.png";
import Ryans from "../assets/rayans.svg";
import PCHouse from "../assets/pchousew.webp";
import TechLand from "../assets/techland.webp";
import Ultra from "../assets/ultra.webp";

import { FaCircleInfo, FaXmark } from "react-icons/fa6";
import Loader from "./Loader";
import Card from "./Card";

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

  const handleSearch = async (headless) => {
    setIsLoading(true);
    setProducts(null);
    setLoadingGif(gifUrls[Math.floor(Math.random() * gifUrls.length)]);
    try {
      console.log(inputValue);

      const response = await fetch(
        `https://price-poka-servre.vercel.app/scrape/${inputValue}`
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex space-x-4">
          <form className="w-full ">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Khoj the Search"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 py-2 gradient-btn"
                onClick={() => handleSearch(true)}
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? <Loader /> : "Search"}
              </button>
              <button
                type="submit"
                className="text-gray-600 absolute end-24 bottom-5 text-sm "
                onClick={() => setInputValue("")}
                disabled={isLoading || !inputValue.trim()}
              >
                <FaXmark />
              </button>
            </div>
          </form>
        </div>
        {isLoading}
        <div className="flex text-red-500 items-center mt-1">
          <FaCircleInfo
            className="mr-2"
            // title="Please provide a accurate product name for better results."
          />
          Try to provide a accurate product name for better results.
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col justify-center items-center mt-4">
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
          <div className="text-xs text-red-600 max-w-lg mx-auto text-center mt-2">
            Scraping data from multiple websites might take some time.
          </div>
        </div>
      )}

      {products && (
        <div className="mt-8">
          {Object.keys(products).map((shop) => (
            <div key={shop} className="my-8">
              <div className="mb-4">
                {shop === "Binary" && (
                  <img src={Binary} alt={shop} className="w-36" />
                )}
                {shop === "StarTech" && (
                  <img src={StarTech} alt={shop} className="w-32" />
                )}
                {shop === "Ryans" && (
                  <img src={Ryans} alt={shop} className="w-32" />
                )}
                {shop === "PcHouse" && (
                  <img src={PCHouse} alt={shop} className="w-36" />
                )}
                {shop === "TechLand" && (
                  <img
                    src={TechLand}
                    alt={shop}
                    className="w-32 bg-black p-3"
                  />
                )}
                {shop === "UltraTech" && (
                  <img src={Ultra} alt={shop} className="w-32" />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products[shop].length <= 0 ? (
                  <div className="text-prime">No Product Found</div>
                ) : (
                  ""
                )}

                {products[shop].map((product, index) => (
                  <Card key={index} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductSearch;
