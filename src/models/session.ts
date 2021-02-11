import { model, Schema, Types } from 'mongoose';

export interface ISession {
  _id: string;
  accessToken: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema(
  {
    accessToken: String,
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const SessionModel = model('Session', SessionSchema);
