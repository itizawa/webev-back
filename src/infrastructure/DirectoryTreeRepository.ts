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
    depth: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export class DirectoryTreeRepository implements IDirectoryTreeRepository {
  DirectoryTreeModel: Model<DirectoryTree & Document>;

  constructor() {
    this.DirectoryTreeModel = model<DirectoryTree & Document>('DirectoryTree', DirectoryTreeSchema);
  }

  async createSelfReference({ directoryId }: { directoryId: string }): Promise<DirectoryTree> {
    return this.DirectoryTreeModel.create({ ancestor: directoryId, descendant: directoryId, depth: 0 });
  }
  async createPathAsDescendant({ ancestorId, descendantId }: { ancestorId: string; descendantId: string }): Promise<void> {
    const trees = await this.DirectoryTreeModel.find({ descendant: ancestorId });

    // generate request for bulk write
    const requests = trees.map((tree) => {
      return { insertOne: { document: { ancestor: tree.ancestor, descendant: descendantId, depth: tree.depth + 1 } } };
    });

    await this.DirectoryTreeModel.bulkWrite(requests);

    return;
  }
  async findChildrenDirectories({ parentDirectoryId }: { parentDirectoryId: string }): Promise<DirectoryTree[]> {
    return this.DirectoryTreeModel.find({ ancestor: parentDirectoryId, depth: 1 }).populate('descendant');
  }
  async findAncestorDirectories({ directoryId }: { directoryId: string }): Promise<DirectoryTree[]> {
    return this.DirectoryTreeModel.find({ descendant: directoryId }).sort({ depth: -1 }).populate('ancestor');
  }
  async deleteDirectoryTree({ directoryId }: { directoryId: string }): Promise<string[]> {
    const trees = await this.DirectoryTreeModel.find({ ancestor: directoryId });
    await this.DirectoryTreeModel.deleteMany({ ancestor: directoryId });

    // generate ids
    const descendantIds = trees.map((tree) => tree.descendant);

    await this.DirectoryTreeModel.deleteMany({ descendant: { $in: descendantIds } });

    return descendantIds;
  }
}
