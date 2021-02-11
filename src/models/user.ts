import { model, Schema, ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    image: String,
  },
  { timestamps: true },
);

export const UserModel = model('User', UserSchema);
