import express from 'express';
import { getAvailableSlots, registerSlot, updateSlot } from '../controllers/slot.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', verifyToken(['user']), getAvailableSlots);
router.post('/register', verifyToken(['user']), registerSlot);
router.put('/update', verifyToken(['user']), updateSlot);

export default router;
