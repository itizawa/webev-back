export class User {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, email, image, createdAt, updatedAt }: { _id: string; name: string; email: string; image: string; createdAt: Date; updatedAt: Date }) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
