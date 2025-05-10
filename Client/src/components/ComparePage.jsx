import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Binary from "../assets/binary.png";
import PCHouse from "../assets/pchousew.webp";
import potaka from "../assets/potaka.webp";
import Ryans from "../assets/rayans.svg";
import Skyland from "../assets/skyland.webp";
import StarTech from "../assets/startech.png";
import TechLand from "../assets/techland.webp";
import Ultra from "../assets/ultra.webp";
import Vibegaming from "../assets/vibegaming.png";
import { useCompare } from "../context/CompareContext";
import placeholder from "../assets/place.jpg";
import Ad from "./Ad";
export default function ComparePage() {
  const { compareList, removeFromCompare, removeAllFromCompare } = useCompare();
  const navigate = useNavigate();

  const logoMap = {
    binarylogic: Binary,
    startech: StarTech,
    ryans: Ryans,
    pchouse: PCHouse,
    techlandbd: TechLand,
    ultratech: Ultra,
    skyland: Skyland,
    vibegaming: Vibegaming,
    potakait: potaka,
  };
  // Extract domain for merchant display
  function getMerchantName(link) {
    try {
      const url = new URL(link);
      return url.hostname.replace("www.", "").split(".")[0];
    } catch {
      return "Merchant";
    }
  }

  // Extract numeric price value
  function getNumber(str) {
    const match = String(str)?.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
    return match ? match[0].replace(/,/g, "") : null;
  }

  const sortedCompareList = [...compareList].sort((a, b) => {
    const priceA = parseFloat(getNumber(a.price)) || Infinity;
    const priceB = parseFloat(getNumber(b.price)) || Infinity;
    return priceA - priceB;
  });

  if (compareList?.length === 0) {
    return (
      <div className="p-8 text-center text-lg text-gray-600 flex flex-col justify-center items-center max-w-7xl w-full mx-auto">
        No products in compare list.{" "}
        <button
          onClick={() => navigate(-1)}
          className="flex mb-4 gap-2 items-center text-blue-600 font-bold hover:underline"
        >
          <FaArrowLeftLong />
          Back to Search
        </button>
      </div>
    );
  }

  const referenceProduct = compareList[0];

  return (
    <div className="p-6 flex flex-col max-w-7xl w-full mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="md:text-sm text-xs flex mb-4 gap-2 items-center text-blue-600 font-bold hover:underline"
      >
        <FaArrowLeftLong className="" />
        Back to Search
      </button>
      {/* Title */}
      <h1 className="md:text-4xl text-2xl  mb-4">Compare</h1>
      {/* <Ad /> */}
      {/* <button
        onClick={() => removeAllFromCompare()}
        className="fixed flex items-center gap-2 bottom-4 right-48 lg:right-64  text-white lg:text-xl md:text-md text-sm z-10 transition-all ease-in-out duration-700 cursor-pointer gradient-btn text p-4 rounded-lg"
      >
        <MdDelete /> Remove All
      </button> */}

      {/* Right - Merchant Table */}
      <div className="bg-white shadow-lg rounded-md overflow-hidden overflow-x-auto md:block hidden">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Shop
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Availability
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCompareList.map((product) => {
              const merchant = getMerchantName(product.link);
              const Logo = merchant ? logoMap[merchant] : null;
              const basePrice = getNumber(product.price);

              return (
                <tr key={product.id}>
                  {/* Shop */}
                  <td className="md:px-6 md:py-4 px-4 py-2 whitespace-nowrap">
                    {Logo ? (
                      <img
                        src={Logo}
                        alt={merchant}
                        className={`  h-8 w-16 object-contain ${
                          merchant.includes("techlandbd") ? "bg-black px-1" : ""
                        }`}
                      />
                    ) : (
                      <span className="text-sm text-gray-500">Unknown</span>
                    )}
                  </td>

                  {/* Product */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          product.img && !product.img.includes("skyland")
                            ? product.img
                            : placeholder
                        }
                        alt={product.name}
                        className="h-10 w-10 object-contain"
                      />
                      <span className="text-gray-900 text-sm">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* Availability */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.price.toLowerCase().includes("stock")
                      ? product.price
                      : "In Stock"}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                    {basePrice
                      ? `${basePrice.toLocaleString("en-BD")} BDT`
                      : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 bg-blue-600 rounded-sm text-white  hover:bg-blue-700"
                    >
                      Buy
                    </a>
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="ml-4 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/******* MOBILE: Card-style Compare**********/}
      <div className="md:hidden space-y-4">
        {sortedCompareList.map((product) => {
          const merchant = getMerchantName(product.link);
          const Logo = merchant ? logoMap[merchant] : null;
          const basePrice = getNumber(product.price);

          return (
            <div
              key={product.id}
              className="bg-gray-100 rounded-md shadow-md p-4 space-y-3"
            >
              {/* 1) small thumb + name */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    product.img && !product.img.includes("skyland")
                      ? product.img
                      : placeholder
                  }
                  alt={product.name}
                  className="h-8 w-8 object-contain rounded"
                />
                <h6 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h6>
              </div>

              {/* 3) availability */}

              {/* 4) shop logo + price */}
              <div className="flex justify-between items-center gap-2">
                <div className="">
                  <span className="text-lg font-semibold text-blue-600">
                    {basePrice
                      ? `${basePrice.toLocaleString("en-BD")}৳`
                      : "N/A"}
                  </span>{" "}
                  <span className="text-xs text-gray-500 ms-2">
                    {product.price.toLowerCase().includes("stock")
                      ? product.price
                      : "In Stock"}
                  </span>
                </div>

                {Logo && (
                  <img
                    src={Logo}
                    alt={merchant}
                    className={`  h-6 w-12 object-contain ${
                      merchant.includes("techlandbd") ? "bg-black px-1" : ""
                    }`}
                  />
                )}
              </div>

              {/* 5) actions */}
              <div className="flex gap-2">
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-sm text-xs hover:bg-blue-800"
                >
                  Buy
                </a>
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="flex-1 text-center px-3 py-2 border border-red-500 text-red-500 rounded-sm text-xs hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
