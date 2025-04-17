const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/transpile', (req, res) => {
    const { code } = req.body;

    const python = spawn('python', ['transpiler.py']); // or 'python3' if needed

    let cppOutput = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
        cppOutput += data.toString();
    });

    python.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    python.on('close', (code) => {
        if (code === 0) {
            res.json({ cpp: cppOutput });
        } else {
            res.status(500).json({ error: errorOutput || 'Transpiler error' });
        }
    });

    // Send Python code to the transpiler
    python.stdin.write(code);
    python.stdin.end();
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
