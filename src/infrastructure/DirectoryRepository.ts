import { model, Model, Schema, Types, Document, UpdateWriteOpResult } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Directory } from '../domains/Directory';
import { Page } from '../domains/Page';

import { IDirectoryRepository } from '../repositories/IDirectoryRepository';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

import { PageSchema } from './PageRepository';

const DirectorySchema: Schema = new Schema(
  {
    url: String,
    name: { type: String, index: true },
    order: { type: Number, index: true },
    pages: { type: [PageSchema], default: [] },
    createdUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export class DirectoryRepository implements IDirectoryRepository {
  DirectoryModel: Model<Directory & Document> & { paginate?: mongoosePaginate };

  constructor() {
    DirectorySchema.plugin(mongoosePaginate);

    this.DirectoryModel = model<Directory & Document>('Directory', DirectorySchema);
  }

  async createDirectory(Directory: Partial<Directory>): Promise<Directory> {
    return this.DirectoryModel.create(Directory);
  }
  async countDirectoryByUserId(userId: string): Promise<number> {
    return this.DirectoryModel.countDocuments({ createdUser: userId });
  }
  async isExistDirectoryByName(name: string, userId: string): Promise<boolean> {
    return this.DirectoryModel.exists({ name, createdUser: userId });
  }
  async deleteDirectory(directoryId: string, userId: string): Promise<Directory> {
    return this.DirectoryModel.findOneAndDelete({ _id: directoryId, createdUser: userId });
  }
  async findDirectory(directoryId: string, userId: string): Promise<Directory> {
    return this.DirectoryModel.findOne({ _id: directoryId, createdUser: userId });
  }
  async findDirectoryList(query: PaginationQuery, options: PaginationOptions): Promise<Directory> {
    return this.DirectoryModel.paginate(query, options);
  }
  async renameDirectory(directoryId: string, name: string, userId: string): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { name }, { new: true });
  }
  async updateOrder(directoryId: string, order: number, userId: string): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { order }, { new: true });
  }
  async updatePagesOfDirectory(directoryId: string, pages: Page[], userId: string): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { pages }, { new: true });
  }
  async increaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    return this.DirectoryModel.updateMany({ order: { $gte: min, $lte: max }, createdUser: userId }, { $inc: { order: 1 } }, { new: true });
  }
  async decreaseDirectory(min: number, max: number, userId: string): Promise<UpdateWriteOpResult> {
    return this.DirectoryModel.updateMany({ order: { $gte: min, $lte: max }, createdUser: userId }, { $inc: { order: -1 } }, { new: true });
  }
}
