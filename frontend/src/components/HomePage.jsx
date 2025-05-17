import React, { useState } from "react";
import PythonInput from "./PythonInput";
import CppOutput from "./CppOutput";
import ActionButtons from "./ActionButtons";

const HomePage = () => {

    const [pythonCode, setPythonCode] = useState("");
    const [cppCode, setCppCode] = useState("");

    const handleConvert = async () => {
        const response = await fetch('http://localhost:5000/convert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: pythonCode }),
        });
        const data = await response.json();
        setCppCode(data.cppCode);
    };

    const handleReset = () => {
        setPythonCode("");
        setCppCode("");
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-glass p-6 rounded-xl shadow-glass border border-green-500 backdrop-blur-md">
                <PythonInput
                    pythonCode={pythonCode}
                    setPythonCode={setPythonCode}
                    handleFileUpload={handleFileUpload}
                />
                <CppOutput
                    cppCode={cppCode}
                    handleCopy={handleCopy}
                    handleDownload={handleDownload}
                />
                <ActionButtons
                    handleReset={handleReset}
                    handleConvert={handleConvert}
                />
            </div >
        </>
    )
};

export default HomePage;