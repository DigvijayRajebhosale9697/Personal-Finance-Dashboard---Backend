// dashboardController.js
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

const dashboardController = {
  // Get aggregated dashboard data
  getDashboardData: async (req, res) => {
    try {
      const userId = req.user.id;

      const transactions = await Transaction.find({ userId });
      const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      const savings = totalIncome - totalExpenses;

      res.status(200).json({
        totalIncome,
        totalExpenses,
        savings,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add a transaction
  addTransaction: async (req, res) => {
    try {
      const { type, amount, category, date } = req.body;
      const userId = req.user.id;

      const newTransaction = new Transaction({
        userId,
        type,
        amount,
        category,
        date,
      });

      await newTransaction.save();

      res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all transactions for a user
  getTransactions: async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await Transaction.find({ userId });

      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add a category
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user.id;

      const newCategory = new Category({ name, userId });
      await newCategory.save();

      res.status(201).json({ message: 'Category added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all categories for a user
  getCategories: async (req, res) => {
    try {
      const userId = req.user.id;
      const categories = await Category.find({ userId });

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};

module.exports = dashboardController;