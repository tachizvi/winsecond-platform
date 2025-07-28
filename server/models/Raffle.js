const mongoose = require('mongoose');

const raffleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ticketCount: { type: Number, default: 0 },
    status: {type: String, enum: ['open', 'closed', 'cancelled'], default: 'open'},
    createdAt: { type: Date, default: Date.now },
    drawnAt: { type: Date, default: null },
});

module.exports = mongoose.model('Raffle', raffleSchema);  