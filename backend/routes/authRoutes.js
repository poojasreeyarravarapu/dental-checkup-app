const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token as a response
    res.json({
      success: true,
      message: 'Login successful',
      token: token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
