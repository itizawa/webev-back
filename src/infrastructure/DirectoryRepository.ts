import { model, Model, Schema, Types, Document, UpdateWriteOpResult } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Directory } from '../domains/Directory';

import { IDirectoryRepository } from '../repositories/IDirectoryRepository';
import { PaginationDirectoryQuery, PaginationOptions } from '../interfaces/pagination';

const DirectorySchema: Schema = new Schema(
  {
    url: String,
    name: { type: String, index: true },
    order: { type: Number, index: true },
    createdUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isRoot: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    description: { type: String, default: '' },
    emojiId: { type: String, default: 'open_file_folder' },
    articleId: {
      type: Types.ObjectId,
      ref: 'Article',
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

  async createDirectory({ directory }: { directory: Partial<Directory> }): Promise<Directory> {
    return this.DirectoryModel.create(directory);
  }
  async countDirectoryByUserId({ userId }: { userId: string }): Promise<number> {
    return this.DirectoryModel.countDocuments({ createdUser: userId, isRoot: true });
  }
  async isExistDirectoryByName({ name, userId }: { name: string; userId: string }): Promise<boolean> {
    return this.DirectoryModel.exists({ name, createdUser: userId });
  }
  async deleteDirectory({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOneAndDelete({ _id: directoryId, createdUser: userId });
  }
  async deleteDirectories({ directoryIds, userId }: { directoryIds: string[]; userId: string }): Promise<number> {
    const { deletedCount } = await this.DirectoryModel.deleteMany({ _id: { $in: directoryIds }, createdUser: userId });

    return deletedCount;
  }
  async findDirectory({ directoryId, userId }: { directoryId: string; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOne({ _id: directoryId, createdUser: userId });
  }
  async findAllDirectories({ userId }: { userId: string }): Promise<Partial<Directory>[]> {
    return this.DirectoryModel.find({ createdUser: userId }).select({ _id: 1, name: 1, description: 1 });
  }
  async findAllParentsDirectories({ userId }: { userId: string }): Promise<Directory[]> {
    return this.DirectoryModel.find({ createdUser: userId, isRoot: true });
  }
  async findDirectoryList({ query, options }: { query: PaginationDirectoryQuery; options: PaginationOptions }): Promise<Directory> {
    return this.DirectoryModel.paginate(query, options);
  }
  async renameDirectory({ directoryId, name, userId }: { directoryId: string; name: string; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { name }, { new: true });
  }
  async updateOrder({ directoryId, order, userId }: { directoryId: string; order: number; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { order }, { new: true });
  }
  async updateIsPublic({ directoryId, isPublic, userId }: { directoryId: string; isPublic: boolean; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { isPublic }, { new: true });
  }
  async updateDescription({ directoryId, description, userId }: { directoryId: string; description: string; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { description }, { new: true });
  }
  async increaseDirectory({ min, max, userId }: { min: number; max: number; userId: string }): Promise<UpdateWriteOpResult> {
    return this.DirectoryModel.updateMany({ order: { $gte: min, $lte: max }, createdUser: userId, isRoot: true }, { $inc: { order: 1 } }, { new: true });
  }
  async decreaseDirectory({ min, max, userId }: { min: number; max: number; userId: string }): Promise<UpdateWriteOpResult> {
    return this.DirectoryModel.updateMany({ order: { $gte: min, $lte: max }, createdUser: userId, isRoot: true }, { $inc: { order: -1 } }, { new: true });
  }
  async updateEmoji({ directoryId, emojiId, userId }: { directoryId: string; emojiId: string; userId: string }): Promise<Directory> {
    return this.DirectoryModel.findOneAndUpdate({ _id: directoryId, createdUser: userId }, { emojiId }, { new: true });
  }
}
