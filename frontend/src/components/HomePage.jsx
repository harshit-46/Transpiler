import { useState } from "react";
import Header from "./Header";
import PythonInput from "./PythonInput";
import CppOutput from "./CppOutput";
import ActionButtons from "./ActionButtons";
import TabbedIRAST from "./TabbedIRAST";

export default function HomePage({ darkMode }) {
    const [pythonCode, setPythonCode] = useState("");
    const [cppCode, setCppCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [ir, setIR] = useState("Convert any python code to see the intermediate Representation(IR) of that code.");
    const [ast, setAST] = useState("Convert any python code to see the Abstract Syntax Tree(AST) of that code.");

    const handleConvert = async () => {
        if (pythonCode.trim() === "") {
            alert("Please enter Python code before converting.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: pythonCode }),
            });
            const data = await response.json();
            console.log("Cpp Code is : ",data.cppCode);
            console.log("IR File is : ",data.ir);
            console.log("AST File is : ",data.ast);
            setCppCode(data.cppCode);
            setIR(data.ir);
            setAST(data.ast);

        } catch (error) {
            alert("Conversion failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setPythonCode("");
        setCppCode("");
        setIR("Convert any python code to see the intermediate Representation(IR) of that code.");
        setAST("Convert any python code to see the Abstract Syntax Tree(AST) of that code.")
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(cppCode);
        alert("Copied to clipboard!");
    };

    const handleDownload = () => {
        const blob = new Blob([cppCode], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.cpp";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setPythonCode(event.target.result);
        };
        reader.readAsText(file);
    };

    return (
        <>
            <Header className="mt-12" />
            <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl mt-12 shadow-glass backdrop-blur-md ${darkMode ? "bg-gray-800" : "bg-[#EEEEFE]"}`}>
                <PythonInput
                    pythonCode={pythonCode}
                    setPythonCode={setPythonCode}
                    handleFileUpload={handleFileUpload}
                    darkMode={darkMode}
                />
                <div className="relative">
                    <CppOutput
                        cppCode={cppCode}
                        handleCopy={handleCopy}
                        handleDownload={handleDownload}
                        darkMode={darkMode}
                    />

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                            <div className="w-10 h-10 mt-28 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

            </div>
            <ActionButtons handleReset={handleReset} handleConvert={handleConvert} loading={loading} />
            <div className="pb-8">
                <TabbedIRAST ir={ir} ast={ast} darkMode={darkMode} />
            </div>
        </>
    );
}
