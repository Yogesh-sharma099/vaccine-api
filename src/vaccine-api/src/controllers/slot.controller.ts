import { Request, Response } from 'express';
import Slot from '../models/Slot';
import User from '../models/User';

export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const slots = await Slot.find({ date });
    const available = slots.filter(slot => slot.registeredUsers.length < 10);
    res.json(available);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const registerSlot = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.auth;
    const { slotId, dose } = req.body;

    const user = await User.findById(userId);
    const slot = await Slot.findById(slotId);

    if (!user || !slot || slot.registeredUsers.length >= 10) {
      return res.status(400).json({ error: 'Invalid or full slot' });
    }

    if (dose === 2 && user.vaccinationStatus !== 'first_done') {
      return res.status(400).json({ error: 'First dose not completed yet' });
    }

    if ((dose === 1 && user.firstDoseSlot) || (dose === 2 && user.secondDoseSlot)) {
      return res.status(400).json({ error: 'Already registered for this dose' });
    }

    slot.registeredUsers.push(user._id);
    await slot.save();

    if (dose === 1) user.firstDoseSlot = slot._id;
    else user.secondDoseSlot = slot._id;

    await user.save();
    res.json({ message: 'Slot registered' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSlot = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.auth;
    const { newSlotId, dose } = req.body;

    const user = await User.findById(userId);
    const newSlot = await Slot.findById(newSlotId);

    if (!user || !newSlot || newSlot.registeredUsers.length >= 10) {
      return res.status(400).json({ error: 'Invalid or full slot' });
    }

    const oldSlotId = dose === 1 ? user.firstDoseSlot : user.secondDoseSlot;
    if (!oldSlotId) return res.status(400).json({ error: 'Not registered before' });

    const oldSlot = await Slot.findById(oldSlotId);
    const slotDateTime = new Date(`${oldSlot.date}T${oldSlot.startTime}`);
    const hoursLeft = (slotDateTime.getTime() - Date.now()) / 3600000;

    if (hoursLeft < 24) return res.status(400).json({ error: 'Cannot change within 24 hrs' });

    oldSlot.registeredUsers = oldSlot.registeredUsers.filter(id => !id.equals(user._id));
    await oldSlot.save();

    newSlot.registeredUsers.push(user._id);
    await newSlot.save();

    if (dose === 1) user.firstDoseSlot = newSlot._id;
    else user.secondDoseSlot = newSlot._id;

    await user.save();
    res.json({ message: 'Slot updated' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};