export class Directory {
  _id: string;
  name: string;
  order: number;
  createdUser: string;
  isRoot: boolean;
  isPublic: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  emojiId: string;
  constructor({ _id, name, order, createdUser, isRoot, isPublic, description, emojiId, createdAt, updatedAt }: Directory) {
    this._id = _id;
    this.name = name;
    this.order = order;
    this.createdUser = createdUser;
    this.isRoot = isRoot;
    this.isPublic = isPublic;
    this.description = description;
    this.emojiId = emojiId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
