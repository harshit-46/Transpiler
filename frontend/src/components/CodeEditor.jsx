import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, onChange }) => {
    return (
        <Editor
            height="100%"
            defaultLanguage={language}
            defaultValue={code}
            theme="vs-dark"
            onChange={onChange}
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
                scrollBeyondLastLine: false,
                theme: "vs-dark",
            }}
        />
    );
};

export default CodeEditor;