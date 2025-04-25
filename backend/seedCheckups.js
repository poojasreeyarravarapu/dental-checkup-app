require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Checkup = require('./models/Checkup'); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

const seedData = [
  {
    checkupId: '1',
    dentistNotes: 'Patient has mild cavities. Advised brushing twice daily.',
    images: [
      { url: '/images/image1.jpg' },
    ],
  },
  {
    checkupId: '2',
    dentistNotes: 'Wisdom tooth removal suggested. Slight gum inflammation noticed.',
    images: [
      { url: '/images/image2.jpg' },
      { url: '/images/image3.jpg' },
    ],
  },
  {
    checkupId: '3',
    dentistNotes: 'Routine checkup complete. No major issues found.',
    images: [
      { url: '/images/image4.jpg' },
    ],
  },
  {
    checkupId: '4',
    dentistNotes: 'Braces are aligned correctly. Next appointment in 6 months.',
    images: [
      { url: '/images/image5.jpg' },
    ],
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data in the Checkup collection
    await Checkup.deleteMany({});
    // Insert new seeded data
    await Checkup.insertMany(seedData);
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

seedDatabase();
