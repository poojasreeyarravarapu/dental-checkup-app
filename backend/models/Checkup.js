  const mongoose = require('mongoose');

  const checkupSchema = new mongoose.Schema({
    checkupId: String,
    dentistNotes: String,
    images: [
      {
        url: String,
        description: String,
      },
    ],
  });

  const Checkup = mongoose.model('Checkup', checkupSchema, 'checkups');
  module.exports = Checkup;
