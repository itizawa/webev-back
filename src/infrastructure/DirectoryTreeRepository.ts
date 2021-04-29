import { model, Model, Schema, Types, Document } from 'mongoose';

import { DirectoryTree } from '../domains/DirectoryTree';

import { IDirectoryTreeRepository } from '../repositories/IDirectoryTreeRepository';

const DirectoryTreeSchema: Schema = new Schema(
  {
    ancestor: {
      type: Types.ObjectId,
      ref: 'Directory',
      required: true,
      index: true,
    },
    descendant: {
      type: Types.ObjectId,
      ref: 'Directory',
      required: true,
      index: true,
    },
    depth: { type: Number },
  },
  { timestamps: true },
);

export class DirectoryTreeRepository implements IDirectoryTreeRepository {
  DirectoryTreeModel: Model<DirectoryTree & Document>;

  constructor() {
    this.DirectoryTreeModel = model<DirectoryTree & Document>('DirectoryTree', DirectoryTreeSchema);
  }

  async createSelfReference(directoryId: string): Promise<DirectoryTree> {
    return this.DirectoryTreeModel.create({ ancestor: directoryId, descendant: directoryId, depth: 0 });
  }
  async createPathAsDescendant(ancestorId: string, descendantId: string): Promise<void> {
    return;
  }
}
