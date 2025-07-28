const Raffle = require('../models/Raffle');
const Product = require('../models/Product');

// יצירת הגרלה חדשה
exports.createRaffle = async (req, res) => {
  try {
    const { productId, minTickets, pricePerTicket } = req.body;

    // בדיקה אם המוצר קיים ושייך למשתמש
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.owner.toString() !== req.user.id)
      return res.status(403).json({ error: 'You can only create raffles for your own products' });

    const raffle = new Raffle({
      product: productId,
      seller: req.user.id,
      minTickets,
      pricePerTicket
    });

    await raffle.save();
    res.status(201).json(raffle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// קבלת כל ההגרלות הפעילות
exports.getAllRaffles = async (req, res) => {
  try {
    const raffles = await Raffle.find({ isActive: true })
      .populate('product')
      .populate('seller', 'username email');
    res.json(raffles);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// קבלת הגרלה לפי ID
exports.getRaffleById = async (req, res) => {
  try {
    const raffle = await Raffle.findById(req.params.id)
      .populate('product')
      .populate('seller', 'username email');
    if (!raffle) return res.status(404).json({ error: 'Raffle not found' });
    res.json(raffle);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
