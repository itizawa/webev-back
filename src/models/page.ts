import { model, Schema, Types, ObjectId, Document, Query } from 'mongoose';
import { UserModel, IUser } from './user';
export interface IPage {
  _id: ObjectId;
  url: string;
  image: string;
  description: string;
  title: string;
  createdUser: Document<IUser>;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema(
  {
    url: String,
    image: String,
    description: String,
    title: String,
    createdUser: {
      type: Types.ObjectId,
      ref: UserModel,
      required: true,
    },
  },
  { timestamps: true },
);

export class PageQueryBuilder {
  query: Query<Document<IPage>[], Document<IPage>>;

  constructor(query: Query<Document<IPage>[], Document<IPage>>) {
    this.query = query;
  }

  addConditionToListByCreatorId(creator: ObjectId): this {
    this.query = this.query.and([{ createdUser: creator }]);

    return this;
  }
}

export const PageModel = model('Page', PageSchema);
