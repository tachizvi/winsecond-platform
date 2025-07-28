const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  minTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  pricePerTicket: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Raffle', raffleSchema);
