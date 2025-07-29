const Raffle = require('../models/Raffle');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');
const e = require('express');

// יצירת הגרלה חדשה
exports.createRaffle = async (req, res) => {
  try {
    const { productId, endsAt } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.owner.toString() !== req.user.id)
      return res.status(403).json({ error: 'You can only create raffles for your own products' });
    minTickets = product.minPrice / 0.1; // Assuming 0.1 is the price per ticket
    if (!endsAt || new Date(endsAt) <= new Date()){
      endsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default to one week from now
    }
    const raffle = new Raffle({
      product: productId,
      seller: req.user.id,
      minTickets,
      endsAt
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
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// קבלת הגרלה לפי ID
exports.getRaffleById = async (req, res) => {
  try {
    const raffle = await Raffle.findById(req.params.id)
      .populate('product')
      .populate('seller', 'username email');
    console.log(raffle);
    if (!raffle) return res.status(404).json({ error: 'Raffle not found' });
    res.json(raffle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// פתרון הגרלה
exports.resolveRaffle = async (req, res) => {
  try {
    const raffle = await Raffle.findById(req.params.id).populate('product');
    if (!raffle) return res.status(404).json({ error: 'Raffle not found' });

    if (raffle.isCompleted) {
      return res.status(400).json({ message: 'Raffle already resolved' });
    }

    const tickets = await Ticket.find({ raffle: raffle._id });

    const totalRaised = tickets.length * raffle.pricePerTicket;
    const minAmountRequired = raffle.minTickets * raffle.pricePerTicket;

    if (totalRaised < minAmountRequired) {
      raffle.isCompleted = true;
      raffle.isSuccessful = false;
      await raffle.save();
      return res.json({ message: 'Raffle failed: Not enough tickets sold' });
    }

    const winnerTicket = tickets[Math.floor(Math.random() * tickets.length)];

    raffle.isCompleted = true;
    raffle.isSuccessful = true;
    raffle.winner = winnerTicket.user;
    await raffle.save();

    res.json({
      message: 'Raffle resolved successfully',
      winnerId: winnerTicket.user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during raffle resolution' });
  }
};