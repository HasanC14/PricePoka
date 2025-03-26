import ProductSearch from "./ProductSearch";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import ScrollButton from "./ScrollButton";

function HomePage() {
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
      className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto w-[90%] py-4"
    >
      <header className="text-center mb-10">
        <h1 className="text-3xl gradient-text font-semibold">Price Poka</h1>
        <div className="text-xs text-prime">
          Compare PC Part Prices Instantly
        </div>
      </header>
      <main className="w-full">
        <ProductSearch />
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollButton />
    </div>
  );
}

export default HomePage;
