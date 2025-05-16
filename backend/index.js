const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/convert", (req, res) => {
    const { code } = req.body;

    // Save Python code to input.py
    fs.writeFileSync(path.join(__dirname, "input.py"), code);

    // Run the Python transpiler (adjust main.py if needed)
    exec("python3 main.py", { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error("Execution error:", error);
            return res.status(500).json({ cppCode: "", error: stderr });
        }

        // Read output.cpp
        try {
            const outputPath = path.join(__dirname, "output.cpp");
            const cppCode = fs.readFileSync(outputPath, "utf-8");
            res.json({ cppCode });
        } catch (readError) {
            res.status(500).json({ cppCode: "", error: "Could not read output.cpp" });
        }
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
