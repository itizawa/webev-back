import { model, Schema, Types } from 'mongoose';

export interface IPage {
  _id: Types.ObjectId;
  url: string;
  image: string;
  description: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema(
  {
    url: String,
    image: String,
    description: String,
    title: String,
  },
  { timestamps: true },
);

export const PageModel = model('Page', PageSchema);
