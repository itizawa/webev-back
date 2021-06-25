import { model, Model, Schema, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IUserRepository } from '../repositories/IUserRepository';

import { User, UpdatableProperity } from '../domains/User';

const UserSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    image: String,
    admin: Boolean,
    isExecutedTutorial: Boolean,
  },
  { timestamps: true },
);

export class UserRepository implements IUserRepository {
  public UserModel: Model<User & Document> & { paginate?: mongoosePaginate };

  constructor() {
    this.UserModel = model<User & Document>('User', UserSchema);
  }

  async findUserById({ userId }: { userId: string }): Promise<User> {
    return this.UserModel.findById(userId);
  }

  async findAllUsers(): Promise<User[]> {
    return this.UserModel.find();
  }

  async updateUserInfoById({ userId, properity }: { userId: string; properity: Partial<Record<UpdatableProperity, string>> }): Promise<User> {
    return this.UserModel.findOneAndUpdate({ _id: userId }, properity, { new: true });
  }

  async updateIsExecutedTutorial({ userId }: { userId: string }): Promise<User> {
    return this.UserModel.findOneAndUpdate({ _id: userId }, { isExecutedTutorial: true }, { new: true });
  }
}
