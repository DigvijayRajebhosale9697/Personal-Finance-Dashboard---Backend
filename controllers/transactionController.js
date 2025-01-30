const Transaction = require("../models/Transaction");

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;

    // Ensure that all required fields are present
    if (!type || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate transaction
    const existingTransaction = await Transaction.findOne({
      userId: req.user.id,
      type,
      amount,
      category,
      date,
    });

    if (existingTransaction) {
      return res.status(400).json({ message: "Transaction already exists" });
    }

    // Create and save new transaction
    const transaction = new Transaction({
      userId: req.user.id,
      type,
      amount,
      category,
      date,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

