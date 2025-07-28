const mongoose = require('mongoose');   
// server/models/User.js
// This file defines the User model for MongoDB using Mongoose.

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},    
    tickets: {type: Number, default: 0},    
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('User', userSchema)