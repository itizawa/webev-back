import { model, Schema, ObjectId, Document } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    image: String,
  },
  { timestamps: true },
);

export const UserModel = model<IUser>('User', UserSchema);
