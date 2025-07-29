// 📁 controllers/ticket.controller.js
const Ticket = require('../models/Ticket');
const Raffle = require('../models/Raffle');

exports.purchaseTickets = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      tickets.push({ user: req.user.id });
    }
    const created = await Ticket.insertMany(tickets);
    res.status(201).json({ purchased: created.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error in purchaseTickets' });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const count = await Ticket.countDocuments({ user: req.user.id, raffle: null });
    res.json({ balance: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error in getWallet' });
  }
};

// הקצאת מספר כרטיסים מהארנק להגרלה מסוימת
exports.assignTickets = async (req, res) => {
  try {
    const { raffleId, count } = req.body;
    if (!count || count < 1) return res.status(400).json({ error: 'Invalid assign count' });

    const raffle = await Raffle.findById(raffleId);
    if (!raffle) return res.status(404).json({ error: 'Raffle not found' });

    // למצוא כרטיסים פנויים בארנק
    const available = await Ticket.find({ user: req.user.id, raffle: null }).limit(count);
    if (available.length < count) {
      return res.status(400).json({ error: 'Not enough tickets in wallet' });
    }

    const ids = available.map(t => t._id);
    await Ticket.updateMany(
      { _id: { $in: ids } },
      { $set: { raffle: raffleId } }
    );

    res.json({ message: 'Tickets assigned', assigned: ids.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
