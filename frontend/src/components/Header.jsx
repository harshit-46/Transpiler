export default function Header() {
    return (
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-2">
                <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                    className="w-10 h-10"
                />
                <span className="text-2xl">➜</span>
                <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                    className="w-10 h-10" 
                />
            </div>
            <h1 className="text-3xl font-semibold">Online Python to C++ Converter</h1>
        </div>
    );
}
