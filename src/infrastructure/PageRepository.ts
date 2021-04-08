import { model, Schema, Types, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Page, PageStatus } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';

import { UserModel } from '../models/user';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

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

export class PageRepository implements IPageRepository {
  PageModel: mongoosePaginate<Page>;

  constructor() {
    PageSchema.plugin(mongoosePaginate);

    this.PageModel = model<Page & Document>('Page', PageSchema);
  }

  async createPage(page: Partial<Page>): Promise<Page> {
    return this.PageModel.create(page);
  }
  async findPageById(id: string, userId: string): Promise<Page> {
    return this.PageModel.findOne({ _id: id, createdUser: userId });
  }
  async findPageList(query: PaginationQuery, options: PaginationOptions): Promise<Page> {
    return this.PageModel.paginate(query, options);
  }
  async updatePageById(pageId: string, page: Partial<Page>): Promise<Page> {
    return this.PageModel.findByIdAndUpdate(pageId, page);
  }
  async updatePageStatus(pageId: string, userId: string, status: PageStatus): Promise<Page> {
    return this.PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { status }, { new: true });
  }
  async updateIsFavorite(pageId: string, userId: string, isFavorite: boolean): Promise<Page> {
    return this.PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { isFavorite }, { new: true });
  }
}
