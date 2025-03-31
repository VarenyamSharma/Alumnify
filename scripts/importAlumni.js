import { config } from 'dotenv';
import { connectDB } from '../lib/db.js';
import Alumni from '../models/Alumni.js';

// Load environment variables from .env.local
config({ path: '.env.local' });

const sampleData = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    company: "Tata Consultancy Services",
    batch: "2018",
    photoUrl: "https://picsum.photos/150",
    location: "Mumbai",
    role: "Software Engineer",
    industry: "Computer Science"
  },
  // Add more sample data as needed
];

async function importAlumniData() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Alumni.deleteMany({});
    console.log('Cleared existing alumni data');

    // Insert new data
    const result = await Alumni.insertMany(sampleData);
    console.log(`Successfully imported ${result.length} alumni records`);

    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
}

importAlumniData(); 