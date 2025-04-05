import { useCompare } from "../context/CompareContext";
import Binary from "../assets/binary.png";
import StarTech from "../assets/startech.png";
import Ryans from "../assets/rayans.svg";
import PCHouse from "../assets/pchousew.webp";
import TechLand from "../assets/techland.webp";
import Ultra from "../assets/ultra.webp";
export default function ComparePage() {
  const { compareList, removeFromCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">
        No products in compare list.
      </div>
    );
  }

  const referenceProduct = compareList[0];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold gradient-text mb-6">
        {referenceProduct.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Left - Product Info */}
        <div className="bg_glass shadow rounded p-4 flex flex-col items-center h-fit">
          <img
            src={referenceProduct.img}
            alt={referenceProduct.name}
            className="w-full h-58 object-cover rounded"
          />
        </div>

        {/* Right - Merchant Table */}
        <div className="bg_glass shadow rounded overflow-hidden p-4 text-gray-300 overflow-x-auto">
          <table className="w-full mnd:text-lg text-sm table-auto">
            <thead className=" text-left">
              <tr className="">
                <th className="p-3">Shop</th>
                <th className="p-3 min-w-[200px]">Product Name</th>
                <th className="p-3">Availability</th>
                <th className="p-3">Price</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {compareList.map((product) => {
                const basePrice = getNumber(product.price);
                return (
                  <tr key={product.id} className="border-t">
                    <td className="p-2 font-medium ">
                      {}
                      <div className="p-2  rounded-lg">
                        {getMerchantName(product.link) === "binarylogic" && (
                          <img
                            src={Binary}
                            alt={getMerchantName(product.link)}
                            className="w-20"
                          />
                        )}
                        {getMerchantName(product.link) === "startech" && (
                          <img
                            src={StarTech}
                            alt={getMerchantName(product.link)}
                            className="w-20"
                          />
                        )}
                        {getMerchantName(product.link) === "ryans" && (
                          <img
                            src={Ryans}
                            alt={getMerchantName(product.link)}
                            className="w-20"
                          />
                        )}
                        {getMerchantName(product.link) === "pchouse" && (
                          <img
                            src={PCHouse}
                            alt={getMerchantName(product.link)}
                            className="w-20"
                          />
                        )}
                        {getMerchantName(product.link) === "techlandbd" && (
                          <img
                            src={TechLand}
                            alt={getMerchantName(product.link)}
                            className="w-20 bg-black p-2"
                          />
                        )}
                        {getMerchantName(product.link) === "ultratech" && (
                          <img
                            src={Ultra}
                            alt={getMerchantName(product.link)}
                            className="w-20"
                          />
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-[12px] ">{product.name}</td>
                    <td className="p-2 ">
                      {product.price.toLowerCase().includes("stock")
                        ? product.price
                        : "In stock"}
                    </td>
                    <td className="p-2 md:text-lg text-xs font-bold">
                      {basePrice ? `${basePrice}৳` : "N/A"}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-3 items-center">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-white rounded gradient-btn text-xs"
                        >
                          Buy
                        </a>
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Footnote like PCPartPicker */}
          <div className="p-4 text-xs text-gray-500 border-t ps-0">
            * Prices and availability are scraped and may change. Clicking "Buy"
            will take you to the respective shop's website.
          </div>
        </div>
      </div>
    </div>
  );
}

// Star Rating Bar (just visual)
function RatingBar({ star, percent }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{star} Star</span>
      <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-3 bg-yellow-400"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="text-xs text-gray-500">{percent}%</span>
    </div>
  );
}

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
  const match = str?.match(/\d{1,3}(,\d{3})*(\.\d+)?/g);
  return match ? match[0].replace(/,/g, "") : null;
}
