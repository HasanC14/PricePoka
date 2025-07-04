import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CompareProvider } from "./context/CompareContext.jsx";
import HomePage from "./components/HomePage";
import ComparePage from "./components/ComparePage";
import SearchPage from "./components/SearchPage";
import Layout from "./layout/Layout.jsx";
import "./App.css";
import GamingPc from "./components/GamingPc.jsx";
import Error from "./components/Error.jsx";

function App() {
  return (
    <Router>
      <CompareProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/gaming-pc" element={<GamingPc />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </CompareProvider>
    </Router>
  );
}

export default App;
