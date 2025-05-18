import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
    return (
        <nav className={` font-semibold ${darkMode ? "bg-gray-900" : "bg-[#EEEEFF]"}`}>
            <div className="container mx-auto px-12 py-2 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <FaCode className={`h-8 w-8 mr-2 ${darkMode ? "text-white" : "text-blue-600"}`} />
                    <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                        Py2Cpp
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    <Link to="/" className={`hover:text-blue-500 ${darkMode ? "text-white" : "text-black"}`}>
                        HOME
                    </Link>
                    <Link to="/about" className={`hover:text-blue-500 ${darkMode ? "text-white" : "text-black"}`}>
                        ABOUT
                    </Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="pt-2 cursor-pointer"
                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        <span className="material-symbols-outlined">
                            {darkMode ? "light_mode" : "dark_mode"}
                        </span>
                    </button>

                </div>
            </div>
        </nav >
    );
}
