import { useEffect, useState, useRef } from "react";
import { MdOutlineContentCopy, MdOutlineFileDownload } from "react-icons/md";

export default function CppOutput({ cppCode, handleCopy, handleDownload, darkMode }) {
    const [lineNumbers, setLineNumbers] = useState("1");
    const textareaRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        const lineNumbers = lineRef.current;
        if (!textarea || !lineNumbers) return;

        const handleScroll = () => {
            lineNumbers.scrollTop = textarea.scrollTop;
        };

        textarea.addEventListener("scroll", handleScroll);
        return () => textarea.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const lines = cppCode.split("\n").length;
        const nums = Array.from({ length: lines }, (_, i) => i + 1).join("\n");
        setLineNumbers(nums);
    }, [cppCode]);

    return (
        <div className="flex flex-col gap-4">
            <div className={`w-full h-24 border-2 rounded px-4 flex flex-col gap-2 justify-center ${darkMode ? "border-white border-dashed" : "border-black border-dashed"}`}>
                <p className={`text-sm ${darkMode ? "text-white" : "text-black"}`}>
                    You can also view the <b>Abstract Syntax Tree (AST)</b> and <b>Intermediate Representation (IR)</b> of the input Python code.
                </p>
                <div className="flex gap-4">
                    <button className={`rounded px-4 py-1 text-sm transition cursor-pointer ${darkMode ? "border border-white" : "border border-black"}`}>
                        AST
                    </button>
                    <button className={`rounded px-4 py-1 text-sm transition cursor-pointer ${darkMode ? "border border-white" : "border border-black"}`}>
                        IR
                    </button>
                </div>
            </div>

            <div className={`relative flex w-full rounded-lg ${darkMode ? "border-2 border-white" : "border-2 border-black"}`} style={{ height: "20rem", overflow: "hidden" }}>
                <div
                    ref={lineRef}
                    className={`text-right px-2 py-2 select-none text-sm font-mono overflow-hidden
                        ${darkMode ? "bg-gray-800 text-gray-400 border-r border-white" : "bg-gray-200 text-gray-600 border-r border-black"}`}
                    style={{ width: "2.5rem" }}
                >
                    <pre style={{ margin: 0, lineHeight: "1.25" }}>{lineNumbers}</pre>
                </div>

                <textarea
                    ref={textareaRef}
                    value={cppCode}
                    readOnly
                    placeholder="The converted C++ code will be displayed here"
                    spellCheck={false}
                    autoCorrect="off"
                    autoComplete="off"
                    className={`w-full px-2 py-2 text-sm font-mono resize-none outline-none
                        ${darkMode ? "bg-gray-900 text-white placeholder-white" : "bg-[#EEEEFF] text-black placeholder-gray-500"}`}
                    style={{ lineHeight: "1.25", whiteSpace: "pre", height: "100%", overflowY: "auto" }}
                />

                <div className="absolute bottom-2 right-2 flex gap-1 pr-2">
                    <button
                        onClick={handleCopy}
                        className={`text-2xl cursor-pointer ${darkMode ? "text-white" : "text-black"}`}
                        title="Copy Code"
                    >
                        <MdOutlineContentCopy />
                    </button>
                    <button
                        onClick={handleDownload}
                        className={`text-3xl cursor-pointer  ${darkMode ? "text-white" : "text-black"}`}
                        title="Download Code"
                    >
                        <MdOutlineFileDownload />
                    </button>
                </div>
            </div>
        </div>
    );
}
