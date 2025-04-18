const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Your tokens and their expiry dates
const tokens = {
  "kiran": { expiry: "2025-12-31" },
  "testuser": { expiry: "2024-12-31" }
};

app.use(cors());

app.get('/verify', (req, res) => {
  const { token } = req.query;
  const record = tokens[token];

  if (!record) {
    return res.json({ valid: false });
  }

  const now = new Date();
  const expiry = new Date(record.expiry);

  const valid = now <= expiry;
  return res.json({ valid });
});

app.get('/', (req, res) => {
  res.send("Token verification server is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
