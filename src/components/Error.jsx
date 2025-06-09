import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full lg:flex lg:items-center lg:gap-12">
      <div className="px-6 py-12 mx-auto ">
        <div className="w-full ">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center border border-blue-600 text-blue-600 py-2 px-4 rounded-sm font-medium md:text-md text-sm transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              <span className="mr-2">
                <LuArrowLeft className="text-xl" />
              </span>
              <span className="hidden md:block">Go back</span>
            </button>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <image
            className="w-full max-w-lg lg:mx-auto"
            src="/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
