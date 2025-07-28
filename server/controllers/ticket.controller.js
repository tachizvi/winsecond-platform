const Ticket = require('../models/Ticket');
const Raffle = require('../models/Raffle');

exports.purchaseTicket = async (req, res) => {
  try {
    const { raffleId, isFree } = req.body;
    const userId = req.user.id;

    const raffle = await Raffle.findById(raffleId);
    if (!raffle || !raffle.isActive) {
      return res.status(404).json({ error: 'Raffle not found or inactive' });
    }

    if (isFree) {
      const existing = await Ticket.findOne({ raffle: raffleId, user: userId, isFree: true });
      if (existing) return res.status(400).json({ error: 'Free ticket already claimed' });
    }

    const ticket = new Ticket({ raffle: raffleId, user: userId, isFree });
    await ticket.save();

    raffle.ticketsSold += 1;
    await raffle.save();

    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
