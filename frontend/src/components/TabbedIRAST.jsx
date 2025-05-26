import { useState } from "react";

function TabbedIRAST({ ir, ast, darkMode }) {
    const [activeTab, setActiveTab] = useState("ir");

    const tabStyle = (tab) =>
        `px-4 py-2 font-semibold rounded-t-lg transition cursor-pointer ${
            activeTab === tab
                ? darkMode
                    ? "bg-white text-black"
                    : "bg-white text-blue-600"
                : darkMode
                    ? "bg-gray-800 text-gray-400"
                    : "text-gray-600"
        }`;

    return (
        <div className={`max-w-6xl md:max-w-7xl mx-auto mt-6 shadow-lg rounded-lg overflow-hidden ${darkMode ? "bg-gray-900 text-white border border-white" : "bg-white text-black border border-black"}`}>
            <div className="flex border-b border-gray-300">
                <button className={tabStyle("ir")} onClick={() => setActiveTab("ir")}>
                    IR
                </button>
                <button className={tabStyle("ast")} onClick={() => setActiveTab("ast")}>
                    AST
                </button>
            </div>
            <div className="p-4 max-h-[500px] overflow-auto">
                <pre className="whitespace-pre-wrap break-words text-sm font-mono">
                    {activeTab === "ir" ? ir : ast}
                </pre>
            </div>
        </div>
    );
}

export default TabbedIRAST