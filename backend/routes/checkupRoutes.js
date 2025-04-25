const express = require('express');
const router = express.Router();
const Checkup = require('../models/Checkup');
const { param } = require('express-validator');

// Route to get checkup by ID
router.get('/results/:checkupId', 
  // Validate checkupId as a valid ObjectId
  param('checkupId').isMongoId().withMessage('Invalid checkup ID format'),
  async (req, res) => {
    const checkupId = req.params.checkupId;

    try {
      // Check if the checkupId is valid MongoDB ObjectId
      const checkup = await Checkup.findOne({ checkupId });
      
      if (!checkup) {
        return res.status(404).json({ error: 'Checkup not found' });
      }
      
      res.json(checkup);
    } catch (error) {
      console.error('Error fetching checkup data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
