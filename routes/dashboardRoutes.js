// dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

// @route GET /api/dashboard
router.get('/', protect, dashboardController.getDashboardData);


module.exports = router;