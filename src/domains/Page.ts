export enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}
export class Page {
  _id: string;
  url: string;
  image: string;
  favicon: string;
  description: string;
  title: string;
  siteName: string;
  directoryId: string;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date;
  status: PageStatus;
  constructor({ _id, url, image, favicon, description, title, siteName, directoryId, createdUser, createdAt, updatedAt, archivedAt, status }: Partial<Page>) {
    this._id = _id;
    this.url = url || '';
    this.image = image || '';
    this.favicon = favicon || '';
    this.description = description || '';
    this.title = title || '';
    this.siteName = siteName || '';
    this.directoryId = directoryId || null;
    this.createdUser = createdUser || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.archivedAt = archivedAt || null;
    this.status = status || PageStatus.PAGE_STATUS_STOCK;
  }
}
