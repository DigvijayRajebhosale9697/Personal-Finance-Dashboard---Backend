const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const categoryController = require('../controllers/categoryController');

// @route POST /api/categories
router.post('/', protect, categoryController.createCategory);

// @route GET /api/categories
router.get('/', protect, categoryController.getCategories);

// @route DELETE /api/categories/:id
router.delete('/:id', protect, categoryController.deleteCategory);

// @route EDIT /api/categories/:id
router.put("/:id", protect, categoryController.updateCategory);

module.exports = router;
