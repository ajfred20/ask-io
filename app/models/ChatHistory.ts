import mongoose, { Schema, Document } from 'mongoose';

export interface IChatHistory extends Document {
  userId: string;
  message: string;
  isUser: boolean;
  attachment?: any;
  createdAt: Date;
}

const ChatHistorySchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  message: { type: String, required: true },
  isUser: { type: Boolean, required: true },
  attachment: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ChatHistory || 
  mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema); 