import { useEffect, useState, useRef } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";


export default function CppOutput({ cppCode, handleCopy, handleDownload, darkMode }) {
    const [lineNumbers, setLineNumbers] = useState("1");
    const textareaRef = useRef(null);

    useEffect(() => {
        const lines = cppCode.split("\n").length;
        const nums = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
        setLineNumbers(nums);
    }, [cppCode]);

    return (
        <div className="flex flex-col gap-4">
            <div className={`relative flex w-full rounded-lg overflow-hidden ${darkMode ? "border-2 border-white" : "border-2 border-black"}`}>
                <pre className={`text-right px-2 select-none text-sm font-mono ${darkMode ? "bg-gray-800 text-gray-400 border-r border-white" : "bg-gray-200 text-gray-600 border-r border-black"}`}>
                    {lineNumbers}
                </pre>

                <textarea
                    ref={textareaRef}
                    value={cppCode}
                    placeholder="The converted C++ code will be displayed here"
                    readOnly
                    spellCheck={false}
                    autoCorrect="off"
                    autoComplete="off"
                    className={`w-full h-80 px-2 text-sm font-mono resize-none outline-none rounded
                        ${darkMode ? "bg-gray-900 text-white placeholder-white" : "bg-[#EEEEFF] text-black placeholder-gray-500"}`}
                    style={{ lineHeight: "1.25", whiteSpace: "pre" }}
                />
                <div className={`pb-2 pr-2 flex items-end justify-end gap-3 ${darkMode ? "bg-gray-900" : "bg-[#EEEEFF]"}`}>
                    <button
                        onClick={handleCopy}
                        className="text-2xl cursor-pointer"
                    >
                        <MdOutlineContentCopy />
                    </button>
                    <button
                        onClick={handleDownload}
                        className="text-3xl cursor-pointer -mb-1"
                    >
                        <MdOutlineFileDownload />
                    </button>
                </div>
            </div>
        </div>
    );
}
