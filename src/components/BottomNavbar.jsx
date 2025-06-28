import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext";
import { useState, useEffect } from "react";
import { LuHouse, LuGitCompare, LuGamepad } from "react-icons/lu";

const Navbar = () => {
  const { compareList } = useCompare();
  const [scale, setScale] = useState(false);

  // bump effect for compare button
  useEffect(() => {
    if (compareList.length > 0) {
      setScale(true);
      const timer = setTimeout(() => setScale(false), 300);
      return () => clearTimeout(timer);
    }
  }, [compareList.length]);

  return (
    <nav className="bottom-nav bg-gray-100 shadow-md fixed bottom-0 left-0 right-0 z-50 dark:bg-[#020817] dark:border-t dark:border-[#1e293b]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
        <div className="flex gap-4 items-center ">
          <Link
            to="/"
            className="inline-flex items-center  text-blue-600 py-2 px-4  font-medium transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
          >
            <span>
              <LuHouse className="text-2xl" />
            </span>
          </Link>
          <Link
            to="/compare"
            className={`inline-flex items-center  text-blue-600 py-2 px-4  font-medium transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white relative  ${
              scale ? "transform scale-105 " : ""
            }`}
          >
            <span>
              <LuGitCompare className="text-2xl" />
            </span>
            <span className="absolute -top-1 right-1 py-1 px-2.5 rounded-full text-sm text-white">
              {compareList.length > 0 && `${compareList.length}`}
            </span>
          </Link>
          <Link
            to="/gaming-pc"
            className="inline-flex items-center text-blue-600 py-2 px-4  font-medium transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
          >
            <span>
              <LuGamepad className="text-2xl" />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
