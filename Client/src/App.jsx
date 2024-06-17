import ProductSearch from "./components/ProductSearch";
import "./App.css";
import Footer from "./components/Footer";
import countapi from "countapi-js";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [visitors, setVisitors] = useState(null);
  const namespace = "pricechecker";
  const key = "hasan14";

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get(
          `https://api.countapi.xyz/hit/${namespace}/${key}`
        );
        console.log(response.data);
        setVisitors(response.data.value);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchVisitors();
  }, []);
  return (
    <div
      id="visits"
      className="flex flex-col items-center justify-center min-h-screen max-w-3xl mx-auto my-4"
    >
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
      <div>
        <h1>Total Visitors: {visitors !== null ? visitors : "Loading..."}</h1>
      </div>
    </div>
  );
}

export default App;
