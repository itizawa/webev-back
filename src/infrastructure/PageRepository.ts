import { model, Model, Schema, Types, Document, UpdateWriteOpResult } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Page, PageStatus } from '../domains/Page';
import { IPageRepository } from '../repositories/IPageRepository';

import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

export const PageSchema: Schema = new Schema(
  {
    url: String,
    image: String,
    favicon: String,
    description: { type: String, index: true },
    title: { type: String, index: true },
    siteName: { type: String, index: true },
    status: {
      type: PageStatus,
      required: true,
      default: PageStatus.PAGE_STATUS_STOCK,
    },
    directoryId: {
      type: Types.ObjectId,
      default: null,
    },
    createdUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    archivedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);
export class PageRepository implements IPageRepository {
  PageModel: Model<Page & Document> & { paginate?: mongoosePaginate };

  constructor() {
    PageSchema.plugin(mongoosePaginate);

    this.PageModel = model<Page & Document>('Page', PageSchema);
  }

  async createPage({ page }: { page: Partial<Page> }): Promise<Page> {
    return this.PageModel.create(page);
  }
  async findPageById({ pageId, userId }: { pageId: string; userId: string }): Promise<Page> {
    return this.PageModel.findOne({ _id: pageId, createdUser: userId });
  }
  async findPageList({ query, options }: { query: PaginationQuery; options: PaginationOptions }): Promise<Page> {
    return this.PageModel.paginate(query, options);
  }
  async findPageListByDirectoryId({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Page[]> {
    return this.PageModel.find({ directoryId, createdUser: userId });
  }
  async findByDirectoryIdAndDeleteDirectoryId({ directoryIds, userId }: { directoryIds: string[]; userId: string }): Promise<UpdateWriteOpResult> {
    return this.PageModel.updateMany({ directoryId: { $in: directoryIds }, createdUser: userId }, { directoryId: null }, { new: true });
  }
  async updatePageById({ pageId, page }: { pageId: string; page: Partial<Page> }): Promise<Page> {
    return this.PageModel.findByIdAndUpdate(pageId, page);
  }
  async updateDirectory({ pageId, directoryId, userId }: { pageId: string; directoryId: string; userId: string }): Promise<Page> {
    return this.PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { directoryId }, { new: true });
  }
  async updatePageStatus({ pageId, userId, status, archivedAt }: { pageId: string; userId: string; status: PageStatus; archivedAt: Date | null }): Promise<Page> {
    return this.PageModel.findOneAndUpdate({ _id: pageId, createdUser: userId }, { status, archivedAt }, { new: true });
  }
  async countAllPages(): Promise<number> {
    return this.PageModel.estimatedDocumentCount();
  }
}
