export default function CppOutput({ cppCode, handleCopy, handleDownload }) {
    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={cppCode}
                placeholder="The converted C++ code will be displayed here"
                readOnly
                className={`${darkMode ? "bg-gray-900" : "bg-[#EEEEFF]"} border border-black text-black rounded-lg p-4 h-64 resize-none outline-none`}
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

/*


import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CppOutput({ cppCode, handleCopy, handleDownload }) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-800">C++ Output:</label>
            <div className="border rounded">
                <SyntaxHighlighter language="cpp" style={dracula} customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}>
                    {cppCode || "// Your converted C++ code will appear here..."}
                </SyntaxHighlighter>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Copy
                </button>
                <button
                    onClick={handleDownload}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Download
                </button>
            </div>
        </div>
    );
}

*/