import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-[#EEEEFF]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
