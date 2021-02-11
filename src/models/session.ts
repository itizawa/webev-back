import { model, Schema, Types } from 'mongoose';
import { UserModel } from './user';

export interface ISession {
  _id: Types.ObjectId;
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
      ref: UserModel,
    },
  },
  { timestamps: true },
);

export const SessionModel = model('Session', SessionSchema);
