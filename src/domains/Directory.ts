export class Directory {
  _id: string;
  name: string;
  order: number;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, order, createdUser, createdAt, updatedAt }: Directory) {
    this._id = _id;
    this.name = name;
    this.order = order;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
