import mongoose, { Schema, Document } from 'mongoose';

export interface IUserCredits extends Document {
  userId: string;
  totalCredits: number;
  usedCredits: number;
  lastUpdated: Date;
}

const UserCreditsSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  totalCredits: { type: Number, required: true, default: 100 },
  usedCredits: { type: Number, required: true, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.UserCredits || 
  mongoose.model<IUserCredits>('UserCredits', UserCreditsSchema); 