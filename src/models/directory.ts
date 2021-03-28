import { model, Schema, Types, ObjectId, Document } from 'mongoose';

import { UserModel, IUser } from './user';

export interface IDirectory extends Document {
  _id: ObjectId;
  name: string;
  createdUser: Document<IUser>;
  createdAt: Date;
  updatedAt: Date;
}

const DirectorySchema: Schema = new Schema(
  {
    name: String,
    createdUser: {
      type: Types.ObjectId,
      ref: UserModel,
      required: true,
    },
  },
  { timestamps: true },
);

export const DirectoryModel = model<IDirectory>('Directory', DirectorySchema);
