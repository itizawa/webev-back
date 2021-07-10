export enum NotificationType {
  NOTIFICATION_TYPE_SCRAP = 'scrap',
}
import { User } from './User';

export class Notification {
  _id: string;
  type: NotificationType;
  url: string;
  fromWhom: User;
  toWhom: User;
  message: string;
  createdAt: Date;
  isChecked: boolean;

  constructor({ _id, type, url, fromWhom, toWhom, message, createdAt, isChecked }: Notification) {
    this._id = _id;
    this.type = type;
    this.url = url;
    this.fromWhom = fromWhom;
    this.toWhom = toWhom;
    this.message = message;
    this.createdAt = createdAt || new Date();
    this.isChecked = isChecked || false;
  }
}
