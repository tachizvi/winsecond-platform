const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  minTickets: { type: Number, required: true },
  endsAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  isCompleted: { type: Boolean, default: false },
  isSuccessful: { type: Boolean, default: false },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Raffle', raffleSchema);
