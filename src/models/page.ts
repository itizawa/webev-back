import { model, Schema, Types } from 'mongoose';
import { UserModel } from './user';
export interface IPage {
  _id: Types.ObjectId;
  url: string;
  image: string;
  description: string;
  title: string;
  createdUser: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema(
  {
    url: String,
    image: String,
    description: String,
    title: String,
    createdUser: {
      type: Types.ObjectId,
      ref: UserModel,
      required: true,
    },
  },
  { timestamps: true },
);

export const PageModel = model('Page', PageSchema);
