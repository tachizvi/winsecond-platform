const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// Routes
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');


// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
console.log("🛣️ Auth routes loaded at /api/auth");
app.use('/api/products', productRoutes);
console.log("🛣️ Product routes loaded at /api/products");
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
