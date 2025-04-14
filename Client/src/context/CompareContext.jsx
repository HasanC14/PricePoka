// context/CompareContext.js
import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCompare = (product) => {
    const alreadyAdded = compareList.find((item) => item.id === product.id);
    if (alreadyAdded) return;

    setCompareList((prev) => [...prev, product]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAllFromCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        removeAllFromCompare,
        showPopup,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
