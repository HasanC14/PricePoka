import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    navigate(`/search?query=${encodeURIComponent(inputValue.trim())}`);
  };

  return (
    <div className="flex flex-col  justify-center w-full mx-auto  md:p-0 p-4">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h1 className="md:text-5xl text-3xl font-semibold text-black">
          Build the <span className="text-blue-600">Best</span>, Pay the{" "}
          <span className="text-blue-600">Least</span>
        </h1>
        <p className="md:text-lg text-sm text-gray-600 mt-4">
          PricePoka compares prices across top Bangladeshi retailers so you
          never overpay on PC parts again.
        </p>
      </header>

      {/* Search Section */}
      <main className=" mb-8">
        <form className="max-w-6xl mx-auto" onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center ps-3 pointer-events-none">
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
              id="default-search"
              className="block w-full p-6 ps-12 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Khoj the search..."
              required
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute right-2 bottom-[.6rem] bg-blue-600 hover:bg-blue-800 font-medium rounded-sm text-xl px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </main>

      {/* Feature Section */}
      <div className="flex flex-wrap gap-8 text-lg text-gray-600 justify-center">
        <div className="flex items-center space-x-2">
          <span className="">
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_74_105)">
                <path
                  d="M4.875 15.75L11 21.875L25 7.875"
                  stroke="#2563EB"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_74_105">
                  <rect
                    width="28"
                    height="28"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span>Compare prices</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="">
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_74_105)">
                <path
                  d="M4.875 15.75L11 21.875L25 7.875"
                  stroke="#2563EB"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_74_105">
                  <rect
                    width="28"
                    height="28"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span>Find best deals</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="">
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_74_105)">
                <path
                  d="M4.875 15.75L11 21.875L25 7.875"
                  stroke="#2563EB"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_74_105">
                  <rect
                    width="28"
                    height="28"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span>Build within budget</span>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
