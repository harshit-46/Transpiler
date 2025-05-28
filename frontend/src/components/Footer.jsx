import { FaTwitter, FaInstagram, FaGithub , FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 md:px-20 py-12 rounded-t-3xl">
            <div className="max-w-6xl mx-auto text-center border-t border-black dark:border-white pt-10">
                <p className="text-xl md:text-2xl font-semibold mb-6">
                    Don’t hesitate to drop me an email <br />
                    or contact me via my social profiles ✌️
                </p>

                <button className="inline-flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full font-mono text-sm md:text-base">
                    iamharshit999@gmail.com
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-8-4h8M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex justify-center gap-6 mt-10 text-2xl">
                    <a href="https://github.com/harshit-46" className="hover:text-green-400 transition" target="_blank">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/harshithere/" className="hover:text-blue-600 transition" target="_blank">
                        <FaLinkedin />
                    </a>
                </div>

                <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                    Handmade with ♥ in India.
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ©2025 Harshit Gupta
                </div>
            </div>
        </footer>
    );
}