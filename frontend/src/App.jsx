/*


import { useState } from "react";

function App() {
  const [pythonCode, setPythonCode] = useState("");
  const [cppCode, setCppCode] = useState("");

  const handleConvert = async () => {
    const response = await fetch('/api/convert', {
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
    <div className="min-h-screen p-8">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-2">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-10" />
          <span className="text-2xl">➜</span>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" className="w-10" />
        </div>
        <h1 className="text-3xl font-semibold">Online Python to C++ Converter</h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-glass p-6 rounded-xl shadow-glass border border-green-500 backdrop-blur-md">
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
              <input type="file" accept=".py" onChange={handleFileUpload} className="hidden" />
            </label>

          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Additional Instructions</label>
            <textarea
              className="w-full bg-black/80 text-gray-300 p-3 rounded-lg h-20 resize-none outline-none"
              placeholder="Provide any specific requirements to tailor the code conversion."
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <textarea
            value={cppCode}
            placeholder="The converted C++ code will be displayed here"
            readOnly
            className="bg-black/80 text-blue-100 rounded-lg p-4 h-64 resize-none outline-none"
          />
          <div className="flex justify-end gap-3">
            <button onClick={handleCopy} className="bg-white/10 px-4 py-1 rounded hover:bg-white/20 text-sm">Copy</button>
            <button onClick={handleDownload} className="bg-white/10 px-4 py-1 rounded hover:bg-white/20 text-sm">Download</button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-6">
        <button onClick={handleReset} className="bg-gray-700 px-6 py-2 rounded hover:bg-gray-600">Reset</button>
        <button onClick={handleConvert} className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">Convert</button>

      </div>
    </div>
  );
}

export default App;


*/


import { useState } from "react";
import Header from "./components/Header";
import PythonInput from "./components/PythonInput";
import CppOutput from "./components/CppOutput";
import ActionButtons from "./components/ActionButtons";

function App() {
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
    <div className="min-h-screen p-8">
      <Header />
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
      </div>
      <ActionButtons
        handleReset={handleReset}
        handleConvert={handleConvert}
      />
    </div>
  );
}

export default App;
