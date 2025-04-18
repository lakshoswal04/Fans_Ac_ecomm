const dotenv = require('dotenv');
const seedData = require('./seedData');

// Load environment variables
dotenv.config();

// Run the seed function
seedData(); 