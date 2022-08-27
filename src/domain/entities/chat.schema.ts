import mongoose from 'mongoose';
import { ChatTypes, Status } from '../enums';
import { Conversation, ConversationSchema, Participant, ParticipantSchema } from './sub-entities';

export interface Chat {
  _id?: string;
  owner: string;
  participants: Participant[];
  conversations: Conversation[];
  status: Status;
  type: ChatTypes;
}

export type ChatDocument = Chat & Document;

export const ChatSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    participants: { type: Array, of: ParticipantSchema, default: [] },
    conversations: { type: Array, of: ConversationSchema, default: [] },
    status: { type: String, required: true, enum: Status },
    type: { type: String, required: true, enum: ChatTypes },
  },
  {
    timestamps: true,
  }
);
