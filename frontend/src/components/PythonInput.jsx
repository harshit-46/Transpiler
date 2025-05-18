import { useEffect, useState, useRef } from "react";
import { MdUploadFile } from "react-icons/md";

export default function PythonInput({ pythonCode, setPythonCode, handleFileUpload, darkMode }) {
    const [lineNumbers, setLineNumbers] = useState("1");
    const textareaRef = useRef(null);

    useEffect(() => {
        const lines = pythonCode.split("\n").length;
        const nums = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
        setLineNumbers(nums);
    }, [pythonCode]);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full h-32 border-2 border-dotted rounded">
                <label className="text-black">
                    <MdUploadFile /> <span>Click to select or drop your input code file here.
                        You can also type the input code below.</span>
                    <input
                        type="file"
                        accept=".py"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
            </div>
            <div className={`relative flex w-full rounded-lg overflow-hidden ${darkMode ? "border-2 border-white" : "border-2 border-black"}`}>
                {/* Line numbers */}
                <pre className={`text-right px-2 select-none text-sm font-mono ${darkMode ? "bg-gray-800 text-gray-400 border-r border-white" : "bg-gray-200 text-gray-600 border-r border-black"
                    }`}>
                    {lineNumbers}
                </pre>

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={pythonCode}
                    onChange={(e) => setPythonCode(e.target.value)}
                    placeholder="Your Python code here"
                    spellCheck={false}
                    autoCorrect="off"
                    autoComplete="off"
                    className={`w-full h-80 px-2 text-sm font-mono resize-none outline-none rounded
                        ${darkMode ? "bg-gray-900 text-white placeholder-white" : "bg-[#EEEEFF] text-black placeholder-gray-500"}`}
                    style={{ lineHeight: "1.25", whiteSpace: "pre" }}
                />
            </div>
        </div>
    );
}