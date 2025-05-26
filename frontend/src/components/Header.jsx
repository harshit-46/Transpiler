export default function Header() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-2 mt-12 px-4 text-center">
            <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                alt="Python logo"
                className="w-24 h-24"
            />
            <span className="text-2xl md:text-4xl font-semibold">
                Online Python to C++ Converter
            </span>
            <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                alt="C++ logo"
                className="w-22 h-22"
            />
        </div>
    );
}
