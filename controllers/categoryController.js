const Category = require("../models/Category");

// @desc Create a new category
// @route POST /api/categories
// @access Private
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    const category = new Category({ name, userId: req.user.id });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get all categories for the logged-in user
// @route GET /api/categories
// @access Private
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Private
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    if (category.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the logged-in user owns this category
    if (category.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    category.name = name || category.name; // Update only if name is provided
    await category.save();

    res.json({ message: "Category updated successfully!", category });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
