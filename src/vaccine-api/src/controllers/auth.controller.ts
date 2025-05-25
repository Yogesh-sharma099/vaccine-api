import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Admin from '../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phoneNumber, password, age, pincode, aadharNumber } = req.body;
    const existing = await User.findOne({ phoneNumber });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, phoneNumber, password: hashedPassword, age, pincode, aadharNumber,
    });

    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};