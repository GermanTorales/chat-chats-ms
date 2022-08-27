import mongoose from 'mongoose';
import { Status } from 'src/domain/enums';

export interface Conversation {
  message: string;
  sender: string;
  status: Status;
}

export const ConversationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sender: { type: String, required: true },
    status: { type: String, required: true, enum: Status },
  },
  {
    timestamps: true,
  }
);
