const Product = require('../models/Product');

// יצירת מוצר חדש
exports.createProduct = async (req, res) => {
  try {
    const { name, description, imageUrl, minPrice } = req.body;

    const product = new Product({
      name,
      description,
      imageUrl,
      minPrice,
      owner: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// קבלת כל המוצרים
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'username email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// קבלת מוצר לפי ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('owner', 'username email');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// עדכון מוצר
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.owner.toString() !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// מחיקת מוצר
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (product.owner.toString() !== req.user.id)
      return res.status(403).json({ error: 'Not authorized' });

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
