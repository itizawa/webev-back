import { model, Schema, Types, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Page } from '../domains/Page';
import { UserModel } from './user';

export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}

const PageSchema: Schema = new Schema(
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

type PageModel<T extends Document> = mongoosePaginate<T>;
export const PageModel: PageModel<Page> = model<Page & Document>('Page', PageSchema);
