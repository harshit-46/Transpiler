import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ darkMode, setDarkMode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const linkStyle = darkMode
        ? "text-white hover:text-blue-500"
        : "text-black hover:text-blue-600";

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={`font-semibold ${darkMode ? "bg-gray-900" : "bg-[#EEEEFF]"}`}>
            <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center z-20">
                    <FaCode className={`h-8 w-8 mr-2 ${darkMode ? "text-white" : "text-blue-600"}`} />
                    <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                        Py2Cpp
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className={linkStyle}>HOME</Link>
                    <Link to="/about" className={linkStyle}>ABOUT</Link>
                    <Link to="/contact" className={linkStyle}>CONTACT</Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle Dark Mode"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        className="pt-1"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {darkMode ? "light_mode" : "dark_mode"}
                        </span>
                    </button>
                </div>

                <div className="md:hidden z-30">
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {menuOpen ? (
                            <FiX className={`${darkMode ? "text-white" : "text-black"} w-7 h-7`} />
                        ) : (
                            <FiMenu className={`${darkMode ? "text-white" : "text-black"} w-7 h-7`} />
                        )}
                    </button>
                </div>
            </div>

            <div className={`md:hidden fixed top-0 right-0 h-full w-3/5 max-w-xs z-20 bg-opacity-95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"} ${darkMode ? "bg-gray-900 text-white" : "bg-[#EEEEFE] text-black"}`}>
                <div className="flex flex-col h-full px-6 py-10 border-l border-black rounded-2xl">
                    <div className="flex flex-col items-end gap-6 text-lg font-medium pt-8">
                        <Link to="/" onClick={toggleMenu} className="hover:text-blue-600">HOME</Link>
                        <Link to="/about" onClick={toggleMenu} className="hover:text-blue-600">ABOUT</Link>
                        <Link to="/contact" onClick={toggleMenu} className="hover:text-blue-600">CONTACT</Link>
                        <button
                            onClick={() => {
                                setDarkMode(!darkMode);
                                toggleMenu();
                            }}
                            aria-label="Toggle Dark Mode"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            className="flex items-center gap-2 hover:text-blue-600"
                        >
                            <span className="material-symbols-outlined text-xl">
                                {darkMode ? "light_mode" : "dark_mode"}
                            </span>
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}