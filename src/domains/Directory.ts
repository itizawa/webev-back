export class Directory {
  _id: string;
  name: string;
  order: number;
  createdUser: string;
  isRoot: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  emojiId: string;
  constructor({ _id, name, order, createdUser, isRoot, description, createdAt, updatedAt }: Directory) {
    this._id = _id;
    this.name = name;
    this.order = order;
    this.createdUser = createdUser;
    this.isRoot = isRoot;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.emojiId = 'open_file_folder';
  }
}
