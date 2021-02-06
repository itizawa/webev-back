import * as mongoose from 'mongoose';

export interface IPage {
  _id: string;
  url: string;
  image: string;
  description: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new mongoose.Schema(
  {
    image: String,
    description: String,
    title: String,
    body: { type: String, select: false },
  },
  { timestamps: true },
);

export const PageModel = mongoose.model('Page', PageSchema);
