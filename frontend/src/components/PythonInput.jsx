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
            <label className={`flex items-center justify-center h-24 rounded-md cursor-pointer transition text-center px-4 ${darkMode ? "border-2 border-dashed border-white" : "border-2 border-dashed border-black"}`}>
                <div className={`flex flex-row items-center ${darkMode ? "text-white" : "text-black"}`}>
                    <MdUploadFile className="text-4xl mr-2" />
                    <p>
                        <b>Click to select</b> or drop your input code file here. <br /> You can also type the input code below.
                    </p>
                </div>
                <input
                    type="file"
                    accept=".py"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>
            <div className={`relative flex w-full rounded-lg overflow-hidden ${darkMode ? "border-2 border-white" : "border-2 border-black"}`}>
                <pre className={`text-right px-2 py-2 select-none text-sm font-mono ${darkMode ? "bg-gray-800 text-gray-400 border-r border-white" : "bg-gray-200 text-gray-600 border-r border-black"}`}>
                    {lineNumbers}
                </pre>
                <textarea
                    ref={textareaRef}
                    value={pythonCode}
                    onChange={(e) => setPythonCode(e.target.value)}
                    placeholder="Your Python code here"
                    spellCheck={false}
                    autoCorrect="off"
                    autoComplete="off"
                    className={`w-full h-80 px-2 py-2 text-sm font-mono resize-none outline-none
                        ${darkMode ? "bg-gray-900 text-white placeholder-white" : "bg-[#EEEEFF] text-black placeholder-gray-500"}`}
                    style={{ lineHeight: "1.25", whiteSpace: "pre" }}
                />
            </div>
        </div>
    );
}
