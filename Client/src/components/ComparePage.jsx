// pages/ComparePage.js
import { useCompare } from "../context/CompareContext";

export default function ComparePage() {
  const { compareList, removeFromCompare } = useCompare();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Compare List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {compareList.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            <img
              src={product.img}
              alt={product.name}
              className="h-32 w-full object-cover"
            />
            <h4 className="font-semibold">{product.name}</h4>
            <button
              className="text-red-500 mt-2"
              onClick={() => removeFromCompare(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
