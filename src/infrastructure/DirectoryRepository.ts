import { model, Model, Schema, Types, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Directory } from '../domains/Directory';
import { IDirectoryRepository } from '../repositories/IDirectoryRepository';
import { PaginationQuery, PaginationOptions } from '../interfaces/pagination';

import { UserModel } from '../models/user';

const DirectorySchema: Schema = new Schema(
  {
    url: String,
    name: String,
    createdUser: {
      type: Types.ObjectId,
      ref: UserModel,
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
  async countDirectoryByName(name: string, userId: string): Promise<number> {
    return this.DirectoryModel.count({ name, createdUser: userId });
  }
  async findDirectoryList(query: PaginationQuery, options: PaginationOptions): Promise<Directory> {
    return this.DirectoryModel.paginate(query, options);
  }
}
