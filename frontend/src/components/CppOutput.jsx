export default function CppOutput({ cppCode, handleCopy, handleDownload, darkMode }) {
    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={cppCode}
                placeholder="The converted C++ code will be displayed here"
                readOnly
                className={`rounded-lg p-4 h-64 resize-none outline-none
                ${darkMode ? "bg-gray-900 text-white placeholder-white border border-white" : "bg-[#EEEEFF] text-black placeholder-gray-500 border border-black "}`}
            />
            <div className="flex justify-end gap-3">
                <button
                    onClick={handleCopy}
                    className="bg-white/10 px-4 py-1 rounded hover:bg-white/20 text-sm cursor-pointer"
                >
                    Copy
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-white/10 px-4 py-1 rounded hover:bg-white/20 text-sm cursor-pointer"
                >
                    Download
                </button>
            </div>
        </div>
    );
}