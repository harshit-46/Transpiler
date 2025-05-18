export default function Header() {
    return (
        <div className="flex justify-center items-center gap-4 mb-2 mt-12">
            <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                className="w-24 h-24"
            />
            <span className="text-4xl font-semibold">Online Python to C++ Converter</span>
            <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                className="w-22 h-22"
            />
        </div>
    );
}
