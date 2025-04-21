// App.js
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ComparePage from "./components/ComparePage";
import FloatingCompareButton from "./components/FloatingCompareButton";
import HomePage from "./components/HomePage";
import { CompareProvider } from "./context/CompareContext.jsx";

function App() {
  return (
    <Router>
      <CompareProvider>
        <FloatingCompareButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </CompareProvider>
    </Router>
  );
}

export default App;
