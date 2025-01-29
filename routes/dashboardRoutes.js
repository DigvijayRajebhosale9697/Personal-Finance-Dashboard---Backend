// dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

// @route GET /api/dashboard
router.get('/', protect, dashboardController.getDashboardData);

// // @route POST /api/dashboard/transactions
// router.post('/transactions', protect, dashboardController.addTransaction);

// // @route GET /api/dashboard/transactions
// router.get('/transactions', protect, dashboardController.getTransactions);

// // @route POST /api/dashboard/categories
// router.post('/categories', protect, dashboardController.addCategory);

// // @route GET /api/dashboard/categories
// router.get('/categories', protect, dashboardController.getCategories);

module.exports = router;