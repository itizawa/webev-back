import { User } from './User';

export class Session {
  _id: string;
  accessToken: string;
  userId: string | User;
  createdAt: Date;
  updatedAt: Date;
  constructor(_id: string, accessToken: string, userId: string, createdAt: Date, updatedAt: Date) {
    this._id = _id;
    this.accessToken = accessToken;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
