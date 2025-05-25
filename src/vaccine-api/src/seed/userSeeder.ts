import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User';

dotenv.config();

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  const bulkOps = [];
  const hashed = await bcrypt.hash('password123', 10);

  for (let i = 0; i < 1_000_000; i++) {
    bulkOps.push({
      insertOne: {
        document: {
          name: `User${i}`,
          phoneNumber: `900000${i.toString().padStart(6, '0')}`,
          password: hashed,
          age: 18 + (i % 60),
          pincode: ['560001', '110001', '400001'][i % 3],
          aadharNumber: `1234567890${i.toString().padStart(2, '0')}`,
          vaccinationStatus: ['none', 'first_done', 'all_done'][i % 3]
        }
      }
    });
  }

  await User.bulkWrite(bulkOps);
  console.log('Seeded 1M users');
  process.exit();
};

seedUsers();