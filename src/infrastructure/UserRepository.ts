import { model, Model, Schema, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { User } from '../domains/User';

const UserSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    image: String,
    admin: Boolean,
  },
  { timestamps: true },
);

export class UserRepository {
  public UserModel: Model<User & Document> & { paginate?: mongoosePaginate };

  constructor() {
    this.UserModel = model<User & Document>('User', UserSchema);
  }

  async findUserById(id: string): Promise<User> {
    return this.UserModel.findById(id);
  }

  async findAllUsers(): Promise<User[]> {
    return this.UserModel.find();
  }

  async updateUserInfoById(userId: string, name: string): Promise<User> {
    return this.UserModel.findOneAndUpdate({ _id: userId }, { name }, { new: true });
  }
}
