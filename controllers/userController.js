const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendPasswordResetLink = async (req, res) => {
    const { email } = req.body;
    console.log("Received email:", email);

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiration = Date.now() + 3600000; 
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiration = resetTokenExpiration;
      await user.save();
  
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
    //   const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS,
    //     },
    //   });
  
      const mailOptions = {
        to: email,
        subject: 'Password Reset Link',
        text: `Click the following link to reset your password: ${resetLink}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).send('Password reset link sent');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
