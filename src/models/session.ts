import { model, Schema, Types, ObjectId, Document } from 'mongoose';
import { UserModel, IUser } from './user';

export interface ISession extends Document {
  _id: ObjectId;
  accessToken: string;
  userId: Document<IUser>;
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

export const SessionModel = model<ISession>('Session', SessionSchema);
