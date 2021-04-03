enum PageStatus {
  PAGE_STATUS_STOCK = 'stocked',
  PAGE_STATUS_ARCHIVE = 'archived',
  PAGE_STATUS_DELETED = 'deleted',
}

export class Page {
  private _id: string;
  private _url: string;
  private _image: string;
  private _description: string;
  private _title: string;
  private _siteName: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _status: PageStatus;
  private _isFavorite: boolean;

  get id(): string {
    return this._id;
  }

  get url(): string {
    return this._url;
  }

  get image(): string {
    return this._image;
  }

  get description(): string {
    return this._description;
  }

  get title(): string {
    return this._title;
  }

  get siteName(): string {
    return this._siteName;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get status(): PageStatus {
    return this._status;
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  constructor(url: string, description: string = null) {
    this._url = url;
    this._description = description;
  }
}
