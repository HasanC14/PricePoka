// components/Card.js
import { useCompare } from "../context/CompareContext";
import placeholder from "../assets/place.jpg";
import { AnimatedCard } from "./AnimatedCard";

export default function Card({ product }) {
  const { addToCompare, compareList } = useCompare();

  const alreadyAdded = compareList.find((item) => item.id === product.id);

  const extractNumbersFromString = (str) => {
    const regex = /[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/g;
    const matches = String(str).match(regex); // Force str into a string
    if (matches && matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      const numericString = lastMatch.replace(/,/g, "");
      return parseFloat(numericString);
    } else {
      return 0;
    }
  };

  const price = extractNumbersFromString(product?.price);

  return (
    <AnimatedCard className="rounded-md overflow-hidden shadow-md text-prime p-4 space-y-2 text-black bg-gray-100 relative min-h-72">
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block "
        title={product?.name}
      >
        <div className="w-full h-32 bg-white rounded-md hover:scale-[103%] transition-all ease-in-out duration-500">
          <img
            src={
              product?.img && !product.img.includes("skyland")
                ? product.img
                : placeholder
            }
            alt={product?.name}
            className={`${
              product?.img.includes("skyland")
                ? "object-cover rounded-md"
                : "object-contain"
            } h-full w-full`}
          />
        </div>

        <h6 className="text-xs text-left pt-2 line-clamp-2">{product?.name}</h6>
        <p className="md:text-lg text-md font-semibold text-blue-600 text-left mt-2">
          {price === "Out Of Stock" || price === 0
            ? "Out Of Stock"
            : `${price.toLocaleString("en-BD")}৳`}
        </p>
      </a>
      <button
        onClick={() => addToCompare(product)}
        className={`absolute bottom-4 left-4 right-4 w-auto rounded-sm py-2  text-xs md:text-base text-white hover:bg-blue-800 ${
          alreadyAdded ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
        }`}
        disabled={alreadyAdded}
      >
        {alreadyAdded ? "Added to compare" : "Add to compare"}
      </button>
    </AnimatedCard>
  );
}
