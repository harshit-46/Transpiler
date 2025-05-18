export default function PythonInput({ pythonCode, setPythonCode, handleFileUpload }) {
    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="Your Python code here"
                className="bg-[#EEEEFF] border border-black text-black rounded-lg p-4 h-64 resize-none outline-none"
            />
            <div className="text-right">
                <label className="text-green-400 hover:underline text-sm cursor-pointer">
                    Upload
                    <input
                        type="file"
                        accept=".py"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
}



/*
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function PythonInput({ pythonCode, setPythonCode, handleFileUpload }) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-semibold text-gray-800">Python Code:</label>
            <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                rows={10}
                className="w-full p-2 font-mono border rounded resize-none shadow"
                placeholder="Write your Python code here..."
            />
            {pythonCode && (
                <div className="mt-2 border rounded">
                    <SyntaxHighlighter language="python" style={dracula} customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}>
                        {pythonCode}
                    </SyntaxHighlighter>
                </div>
            )}
            <input type="file" onChange={handleFileUpload} className="mt-2" />
        </div>
    );
}

*/
