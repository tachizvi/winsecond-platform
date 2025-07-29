const express = require('express');
const router = express.Router();
const raffleController = require('../controllers/raffle.controller');
const {authMiddleware} = require('../middleware/auth.middleware');

router.post('/', authMiddleware, raffleController.createRaffle);
router.get('/', raffleController.getAllRaffles);
router.get('/:id', raffleController.getRaffleById);
router.post('/:id/resolve', authMiddleware, raffleController.resolveRaffle);

module.exports = router;
