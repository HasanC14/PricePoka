// components/FloatingCompareButton.js
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";

export default function FloatingCompareButton() {
  const { compareList } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <Link
      to="/compare"
      className="fixed bottom-4 right-4  text-white lg:text-xl md:text-md text-sm z-10 transition-all ease-in-out duration-700 cursor-pointer gradient-btn text p-4 rounded-lg"
    >
      🧾 Compare List ({compareList.length})
    </Link>
  );
}
