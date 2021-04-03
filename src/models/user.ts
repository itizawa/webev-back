import { model, Schema, Document } from 'mongoose';
import { User } from '../domains/User';

const UserSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    image: String,
  },
  { timestamps: true },
);

export const UserModel = model<User & Document>('User', UserSchema);
