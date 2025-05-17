import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-[#EEEEFF]">
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
