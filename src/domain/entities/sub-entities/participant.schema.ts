import mongoose from 'mongoose';
import { UserTypes } from 'src/domain/enums';

export interface Participant {
  userId: string;
  role: UserTypes;
}

export const ParticipantSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    role: { type: String, required: true, enum: UserTypes },
  },
  {
    _id: false,
    timestamps: false,
  }
);
