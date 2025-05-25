import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot extends Document {
  date: string;
  startTime: string;
  endTime: string;
  registeredUsers: mongoose.Types.ObjectId[];
}

const SlotSchema: Schema = new Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<ISlot>('Slot', SlotSchema);