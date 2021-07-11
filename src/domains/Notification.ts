import { URL } from 'url';
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
  url: URL;
  createdAt: Date;
  isChecked: boolean;

  constructor({ _id, type, fromWhom, toWhom, message, url, createdAt, isChecked }: Notification) {
    this._id = _id;
    this.type = type;
    this.fromWhom = fromWhom;
    this.toWhom = toWhom;
    this.message = message;
    this.url = url;
    this.createdAt = createdAt;
    this.isChecked = isChecked;
  }
}
