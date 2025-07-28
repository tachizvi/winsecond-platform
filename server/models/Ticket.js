const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  raffle: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  isFree: { type: Boolean, default: false }
});

module.exports = mongoose.model('Ticket', ticketSchema);
// This model represents a ticket in a raffle system, linking to the raffle and user who owns it.
// It includes fields for creation date and whether the ticket is free or not.