import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
  supabaseId: string;
  email: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema: Schema = new Schema({
  supabaseId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bio: { type: String },
  profilePicture: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on save
UserProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.UserProfile || 
  mongoose.model<IUserProfile>('UserProfile', UserProfileSchema); 