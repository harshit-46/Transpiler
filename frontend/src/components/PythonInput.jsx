export default function PythonInput({ pythonCode, setPythonCode, handleFileUpload }) {
    return (
        <div className="flex flex-col gap-4">
            <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="Your Python code here"
                className="bg-black/80 text-green-100 rounded-lg p-4 h-64 resize-none outline-none"
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
            <div>
                <label className="block font-semibold mb-1 text-sm">
                    Additional Instructions
                </label>
                <textarea
                    className="w-full bg-black/80 text-gray-300 p-3 rounded-lg h-20 resize-none outline-none"
                    placeholder="Provide any specific requirements to tailor the code conversion."
                />
            </div>
        </div>
    );
}
