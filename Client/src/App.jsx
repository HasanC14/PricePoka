import ProductSearch from "./components/ProductSearch";
import "./App.css";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-3xl mx-auto my-4">
      {/* <header className="">
        <h1 className="text-3xl gradient-text font-semibold">Price Checker</h1>
        <div className="text-xs text-prime">
          Compare PC Part Prices Instantly
        </div>
      </header> */}
      <main className="w-full">
        <ProductSearch />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
