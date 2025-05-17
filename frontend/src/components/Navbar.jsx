import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-[#EEEEFF] shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <FaCode className="h-8 w-8 mr-2 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">
                                Python to C++ Converter
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
