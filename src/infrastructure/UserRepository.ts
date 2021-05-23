import { model, Model, Schema, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { User } from '../domains/User';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, unique: true },
    email: String,
    image: String,
  },
  { timestamps: true },
);

export class UserRepository {
  public UserModel: Model<User & Document> & { paginate?: mongoosePaginate };

  constructor() {
    this.UserModel = model<User & Document>('User', UserSchema);
  }

  async findUserByUserName(name: string):Promise<User>{
    return this.UserModel.findOne({ name })
  }
}
