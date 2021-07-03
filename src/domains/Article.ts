import { Page } from './Page';

export class Article {
  _id: string;
  title: string; // Directory の name に相当
  body: string; // Directory の description に相当
  createdUser: string;
  isPublic: boolean;
  emojiId: string;
  pages: Page[];
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, title, createdUser, isPublic, body, emojiId, createdAt, updatedAt }: Partial<Article>) {
    this._id = _id;
    this.title = title;
    this.createdUser = createdUser;
    this.isPublic = isPublic;
    this.body = body;
    this.emojiId = emojiId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export type UpdatableProperity = Partial<Pick<Article, 'title' | 'body' | 'isPublic' | 'emojiId' | 'pages'>>;
