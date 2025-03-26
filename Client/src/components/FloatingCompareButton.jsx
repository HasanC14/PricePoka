// components/FloatingCompareButton.js
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";

export default function FloatingCompareButton() {
  const { compareList } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <Link
      to="/compare"
      className="fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-gray-800 transition"
    >
      🧾 Compare ({compareList.length})
    </Link>
  );
}
