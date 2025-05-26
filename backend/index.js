const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend API running');
});


app.post("/convert", (req, res) => {
    const { code } = req.body;

    // Save the Python code to input.py
    fs.writeFileSync(path.join(__dirname, "input.py"), code);

    // Execute the Python transpiler
    exec("python3 main.py", { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error("Execution error:", error);
            return res.status(500).json({ cppCode: "", ir: "", ast: "", error: stderr });
        }

        try {
            const cppCode = fs.readFileSync(path.join(__dirname, "output.cpp"), "utf-8");
            const ir = fs.readFileSync(path.join(__dirname, "ir.txt"), "utf-8");
            const ast = fs.readFileSync(path.join(__dirname, "ast.txt"), "utf-8");

            console.log("CPP Code:", cppCode);
    console.log("IR:", ir);
    console.log("AST:", ast);

            res.json({ cppCode, ir, ast });
        } catch (readError) {
            console.error("File read error:", readError);
            res.status(500).json({ cppCode: "", ir: "", ast: "", error: "Could not read one or more output files" });
        }
    });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
