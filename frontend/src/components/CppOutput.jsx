export default function CppOutput({ cppCode, handleCopy, handleDownload }) {
    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={cppCode}
                placeholder="The converted C++ code will be displayed here"
                readOnly
                className="bg-black/80 text-blue-100 rounded-lg p-4 h-64 resize-none outline-none"
            />
            <div className="flex justify-end gap-3">
                <button
                    onClick={handleCopy}
                    className="bg-white/10 px-4 py-1 rounded hover:bg-white/20 text-sm"
                >
                    Copy
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-white/10 px-4 py-1 rounded hover:bg-white/20 text-sm"
                >
                    Download
                </button>
            </div>
        </div>
    );
}
