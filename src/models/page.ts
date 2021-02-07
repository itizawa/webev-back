import * as mongoose from 'mongoose';

export interface IPage {
  _id: string;
  url: string;
  image: string;
  description: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new mongoose.Schema(
  {
    url: String,
    image: String,
    description: String,
    title: String,
  },
  { timestamps: true },
);

export const PageModel = mongoose.model('Page', PageSchema);
