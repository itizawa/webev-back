import { model, Schema, Types, ObjectId, Document } from 'mongoose';
import { User } from '../domains/User';
import { UserModel } from './user';

export interface ISession extends Document {
  _id: ObjectId;
  accessToken: string;
  userId: string | User;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    accessToken: String,
    userId: {
      type: Types.ObjectId,
      ref: UserModel,
    },
  },
  { timestamps: true },
);

export const SessionModel = model<ISession & Document>('Session', SessionSchema);
