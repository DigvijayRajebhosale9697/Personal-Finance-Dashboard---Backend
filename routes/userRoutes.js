const express = require('express');
const { registerUser, loginUser,sendPasswordResetLink  } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendPasswordResetLink);

module.exports = router;
