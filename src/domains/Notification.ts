import { User } from './User';

export enum NotificationType {
  NOTIFICATION_TYPE_SCRAP = 'scrap',
}

export class Notification {
  _id: string;
  type: NotificationType;
  fromWhom: User;
  toWhom: User;
  message: string;
  url: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor({ _id, type, fromWhom, toWhom, message, url, isChecked, createdAt, updatedAt }: Notification) {
    this._id = _id;
    this.type = type;
    this.fromWhom = fromWhom;
    this.toWhom = toWhom;
    this.message = message;
    this.url = url;
    this.isChecked = isChecked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
