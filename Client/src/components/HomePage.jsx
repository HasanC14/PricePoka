import ProductSearch from "./ProductSearch";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo.png";


function HomePage() {
  // const namespace = "pricechecker";
  // const key = "hasan14";

  // useEffect(() => {
  //   const fetchVisitors = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.countapi.xyz/hit/${namespace}/${key}`
  //       );
  //       console.log(response.data);
  //       setVisitors(response.data.value);
  //     } catch (error) {
  //       console.error("Error fetching the data", error);
  //     }
  //   };

  //   fetchVisitors();
  // }, []);
  return (
<div
  id="visits"
  className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto w-[90%] py-4"
>
  <header className="text-center mb-10">
    <img
      src="/logo.png"
      alt="PricePoka Logo"
      className="mx-auto mb-4 h-16 w-auto"
    />
    <h1 className="text-3xl gradient-text font-semibold">PricePoka</h1>
    <p className="text-xs text-prime">Compare Prices Instantly</p>
  </header>

  <main className="w-full">
    <ProductSearch />
  </main>

  <footer>
    <Footer />
  </footer>
</div>
  );
}

export default HomePage;
