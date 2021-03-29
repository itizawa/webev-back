import { model, Schema, Types, ObjectId, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

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

DirectorySchema.plugin(mongoosePaginate);

type DirectoryModel<T extends Document> = mongoosePaginate<T>;
export const DirectoryModel: DirectoryModel<IDirectory> = model<IDirectory>('Directory', DirectorySchema);
