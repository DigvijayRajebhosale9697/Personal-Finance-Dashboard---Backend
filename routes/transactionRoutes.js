const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController');

// Create a transaction
router.post('/', protect, createTransaction);

// Get all transactions
router.get('/', protect, getTransactions);

// Delete a transaction
router.delete('/:id', protect, deleteTransaction);

module.exports = router;
