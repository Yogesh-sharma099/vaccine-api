import express from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import { filterUsers, slotStats } from '../controllers/admin.controller';

const router = express.Router();

router.get('/users', verifyToken(['admin']), filterUsers);
router.get('/slots', verifyToken(['admin']), slotStats);

export default router;