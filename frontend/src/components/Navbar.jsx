import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white/20 backdrop-blur-md shadow-md px-8 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-semibold text-gray-900">Py2Cpp</div>
                <ul className="flex gap-6 text-gray-800 font-medium text-sm">
                    <li className="hover:text-blue-600 transition cursor-pointer">Home</li>
                    <li className="hover:text-blue-600 transition cursor-pointer">Overview</li>
                    <li className="hover:text-blue-600 transition cursor-pointer">Contact Us</li>
                    <li>
                        <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            Login
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
