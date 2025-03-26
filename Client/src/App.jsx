// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import ComparePage from "./components/ComparePage";
import FloatingCompareButton from "./components/FloatingCompareButton";
import { CompareProvider } from "./context/CompareContext.jsx";

function App() {
  return (
    <CompareProvider>
      <Router>
        <FloatingCompareButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </Router>
    </CompareProvider>
  );
}

export default App;
