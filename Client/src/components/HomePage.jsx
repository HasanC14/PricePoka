import Ad from "./Ad";
import SearchBar from "./SearchBox";

function HomePage() {
  return (
    <div className="flex flex-col  justify-center w-full mx-auto  md:p-0 p-4">
      {/* Header Section */}
      <header className="text-center md:mb-8 mb-4">
        <h1 className="md:text-4xl text-2xl font-semibold text-black">
          Get the <span className="text-blue-600">Best</span>, Pay the{" "}
          <span className="text-blue-600">Least</span>
        </h1>
        <p className="md:text-lg text-sm text-gray-600 md:mt-4 mt-2">
          PricePoka compares prices across top Bangladeshi retailers so you
          never overpay again.
        </p>
      </header>
      {/* Search Section */}
      <main className="">
        <SearchBar />
      </main>
      {/* <Ad /> */}
    </div>
  );
}

export default HomePage;
