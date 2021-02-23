import { model, Schema, Types, ObjectId, Document, Query } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { UserModel, IUser } from './user';
export interface IPage {
  _id: ObjectId;
  url: string;
  image: string;
  description: string;
  title: string;
  siteName: string;
  status: PageStatus;
  isFavorite: boolean;
  createdUser: Document<IUser>;
  createdAt: Date;
  updatedAt: Date;
}

export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}

const PageSchema = new Schema(
  {
    url: String,
    image: String,
    description: String,
    title: String,
    siteName: String,
    status: {
      type: PageStatus,
      required: true,
      default: PageStatus.PAGE_STATUS_STOCK,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    createdUser: {
      type: Types.ObjectId,
      ref: UserModel,
      required: true,
    },
  },
  { timestamps: true },
);

PageSchema.plugin(mongoosePaginate);
export const PageModel = model('Page', PageSchema);
