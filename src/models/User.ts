import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  password: string;
  age: number;
  pincode: string;
  aadharNumber: string;
  vaccinationStatus: 'none' | 'first_done' | 'all_done';
  firstDoseSlot?: mongoose.Types.ObjectId;
  secondDoseSlot?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  pincode: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  vaccinationStatus: { type: String, enum: ['none', 'first_done', 'all_done'], default: 'none' },
  firstDoseSlot: { type: Schema.Types.ObjectId, ref: 'Slot' },
  secondDoseSlot: { type: Schema.Types.ObjectId, ref: 'Slot' },
});

export default mongoose.model<IUser>('User', UserSchema);
