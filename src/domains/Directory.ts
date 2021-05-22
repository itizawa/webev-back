export class Directory {
  _id: string;
  name: string;
  order: number;
  createdUser: string;
  isRoot: boolean;
  description: string;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, order, createdUser, isRoot, description, archivedAt, createdAt, updatedAt }: Directory) {
    this._id = _id;
    this.name = name;
    this.order = order;
    this.createdUser = createdUser;
    this.isRoot = isRoot;
    this.description = description;
    this.archivedAt = archivedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
