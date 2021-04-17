import { PageStatus } from '../domains/Page';

export class PaginationQuery {
  createdUser: string;
  status: PageStatus;
  isFavorite: boolean;
  directoryId: string;
  constructor(createdUser: string, status: PageStatus, isFavorite?: boolean, directoryId?: string) {
    this.createdUser = createdUser;
    this.status = status;
    this.isFavorite = isFavorite;
    this.directoryId = directoryId;
  }
}

export class PaginationOptions {
  page: number;
  limit: number;
  sort?: { [key: string]: number };
  constructor(page: number, limit: number, sort?: { [key: string]: number }) {
    this.page = page;
    this.limit = limit;
    this.sort = sort;
  }
}

export class PaginationDirectoryQuery {
  createdUser: string;
  constructor(createdUser: string) {
    this.createdUser = createdUser;
  }
}
