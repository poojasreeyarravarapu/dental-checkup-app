const express = require('express');
const mongoose = require('mongoose');
const corsOptions = {
  origin: 'https://dental-checkup-app.vercel.app', // Replace with your frontend's deployed URL
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));
const path = require('path');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');  // Import your user model
const authRoutes = require('./routes/authRoutes');
const checkupRoutes = require('./routes/checkupRoutes');

// Initialize dotenv
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());  // for parsing application/json
app.use('/uploads', express.static('uploads')); // for serving static uploads
app.use('/images', express.static(path.join(__dirname, 'images'))); // for serving image folder

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use routes for authentication and checkups
app.use('/api/auth', authRoutes);
app.use('/api/checkup', checkupRoutes);

// User registration route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    return res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// User login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Get checkup results by checkupId
app.get('/api/checkup/results/:checkupId', async (req, res) => {
  try {
    const checkupId = req.params.checkupId;
    const checkup = await Checkup.findOne({ checkupId }); // Using checkupId to fetch data
    if (!checkup) {
      return res.status(404).json({ error: 'Checkup not found' });
    }
    res.json(checkup);
  } catch (error) {
    console.error('Error fetching checkup data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add other routes here (example: checkup routes for appointments, etc.)
// Routes for Checkup, appointments, etc.
app.use('/api/checkup', checkupRoutes);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
