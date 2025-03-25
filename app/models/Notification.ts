import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  icon?: string;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['success', 'info', 'warning', 'error'],
    default: 'info'
  },
  icon: { type: String },
  isRead: { type: Boolean, default: false },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || 
  mongoose.model<INotification>('Notification', NotificationSchema); 