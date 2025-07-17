const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'API is running successfully 🚀' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
