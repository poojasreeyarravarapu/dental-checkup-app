// routes/checkupRoutes.js
const express = require('express');
const router = express.Router();
const Checkup = require('../models/Checkup');

// Route to get checkup by ID
router.get('/results/:checkupId', async (req, res) => {
  try {
    const checkupId = req.params.checkupId;
    const checkup = await Checkup.findOne({ checkupId }); // Fetch by checkupId field
    if (!checkup) {
      return res.status(404).json({ error: 'Checkup not found' });
    }
    res.json(checkup);
  } catch (error) {
    console.error('Error fetching checkup data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
