// context/CompareContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const navigate = useNavigate();
  const [compareList, setCompareList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // get compare list from local storage
  useEffect(() => {
    const compareList = JSON.parse(localStorage.getItem("compareList"));
    if (compareList) setCompareList(compareList);
  }, []);

  const updateLocalStorageCompareList = (list) =>
    localStorage.setItem("compareList", JSON.stringify(list));

  const addToCompare = (product) => {
    const alreadyAdded = compareList.find((item) => item.id === product.id);
    if (alreadyAdded) return;
    const newCompareList = [...compareList, product];
    // save compare list to local storage
    updateLocalStorageCompareList(newCompareList);
    setCompareList(newCompareList);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const removeFromCompare = (id) => {
    const newCompareList = compareList.filter((item) => item.id !== id);
    setCompareList(newCompareList);
    updateLocalStorageCompareList(newCompareList);
    if (newCompareList.length === 0) navigate("/");
  };

  const removeAllFromCompare = () => {
    setCompareList([]);
    updateLocalStorageCompareList([]);
    navigate("/");
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
