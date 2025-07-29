// 📁 routes/ticket.routes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const {authMiddleware} = require('../middleware/auth.middleware');

router.post('/purchase', authMiddleware, ticketController.purchaseTickets);  // קניית כרטיסים
router.get('/wallet',   authMiddleware, ticketController.getWallet);         // בדיקת מאזן
router.post('/assign',   authMiddleware, ticketController.assignTickets);    // הקצאת כרטיסים להגרלה

module.exports = router;
