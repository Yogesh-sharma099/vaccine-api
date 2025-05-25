import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import slotRoutes from './routes/slot.routes';
import userRoutes from './routes/user.routes';
import { verifyToken } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', verifyToken(['admin']), adminRoutes);
app.use('/api/slots', verifyToken(['user']), slotRoutes);
app.use('/api/user', verifyToken(['user']), userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});