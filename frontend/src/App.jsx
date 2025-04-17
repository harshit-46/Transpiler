import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";

const App = () => {
  const [pythonCode, setPythonCode] = useState(`# Write your Python code here`);
  const [cppCode, setCppCode] = useState(`// Your transpiled C++ code will appear here`);
  const [status, setStatus] = useState("Ready for input...");

  const handleTranspile = async () => {
    setStatus("Transpiling...");
    try {
      const res = await fetch("http://localhost:5000/transpile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: pythonCode }),
      });

      const data = await res.json();
      setCppCode(data.cpp || "// No output");
      setStatus("Transpilation complete ✅");
    } catch (err) {
      console.error(err);
      setStatus("Error during transpilation ❌");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-green-400 font-mono flex flex-col">
      <header className="bg-[#0f0f0f] text-green-500 text-xl px-4 py-2 border-b border-green-700 flex justify-between items-center">
        Py2Cpp Transpiler ⚡
        <button
          onClick={handleTranspile}
          className="bg-green-700 hover:bg-green-600 px-4 py-1 text-black rounded-md"
        >
          Transpile
        </button>
      </header>

      <div className="flex flex-1">
        <div className="w-1/2 border-r border-green-700">
          <div className="p-2 border-b border-green-700 text-lg">Python</div>
          <CodeEditor
            language="python"
            code={pythonCode}
            onChange={(value) => setPythonCode(value || "")}
          />
        </div>

        <div className="w-1/2">
          <div className="p-2 border-b border-green-700 text-lg">C++</div>
          <CodeEditor
            language="cpp"
            code={cppCode}
            onChange={() => {}}
          />
        </div>
      </div>

      <footer className="bg-[#0f0f0f] text-green-600 px-4 py-2 border-t border-green-700 text-sm">
        Status: {status}
      </footer>
    </div>
  );
};

export default App;
