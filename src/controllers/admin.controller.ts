import { Request, Response } from 'express';
import User from '../models/User';
import Slot from '../models/Slot';

export const filterUsers = async (req: Request, res: Response) => {
  try {
    const { age, pincode, vaccinationStatus } = req.query;
    const query: any = {};

    if (age) query.age = Number(age);
    if (pincode) query.pincode = pincode;
    if (vaccinationStatus) query.vaccinationStatus = vaccinationStatus;

    const start = performance.now();
    const users = await User.find(query);
    const duration = performance.now() - start;

    res.json({ duration: `${duration.toFixed(2)} ms`, total: users.length, users });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const slotStats = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const slots = await Slot.find({ date });

    let firstDose = 0;
    let secondDose = 0;

    for (const slot of slots) {
      const slotId = (slot._id as any).toString();
      const users = await User.find({
        $or: [
          { firstDoseSlot: slot._id },
          { secondDoseSlot: slot._id }
        ]
      });

      for (const user of users) {
        if (user.firstDoseSlot?.toString() === slotId) firstDose++;
        if (user.secondDoseSlot?.toString() === slotId) secondDose++;
      }
    }

    res.json({ date, totalSlots: slots.length, firstDose, secondDose, total: firstDose + secondDose });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
