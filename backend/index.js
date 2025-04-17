const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/transpile', (req, res) => {
    const { code } = req.body;

    console.log('Received Python code:\n', code);

    // Replace this with actual transpiler logic
    const fakeCpp = `// Transpiled C++\n#include <iostream>\n\nint main() {\n  std::cout << "Hello from transpiled code!" << std::endl;\n  return 0;\n}`;

    res.json({ cpp: fakeCpp });
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
