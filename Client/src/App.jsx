import ProductSearch from "./components/ProductSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-semibold text-center py-8">
          Product Search
        </h1>
      </header>
      <main>
        <ProductSearch />
      </main>
    </div>
  );
}

export default App;
