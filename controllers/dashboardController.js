
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');

const dashboardController = {

  getDashboardData: async (req, res) => {
    try {
      const userId = req.user.id;

      const transactions = await Transaction.find({ userId });
      res.status(200).json({
        transactions
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

};

module.exports = dashboardController;