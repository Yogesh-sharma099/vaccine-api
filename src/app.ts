import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import slotRoutes from './routes/slot.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/slots', slotRoutes);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || '';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;