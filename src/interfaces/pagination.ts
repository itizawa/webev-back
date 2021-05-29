import { PageStatus } from '../domains/Page';

export class PaginationQuery {
  createdUser: string;
  status: { $in: Array<PageStatus> };
  $or: Array<{ title?: RegExp; siteName?: RegExp; description?: RegExp }>;
  directoryId: string;
  constructor({ createdUser, directoryId }: Partial<PaginationQuery>) {
    this.createdUser = createdUser;
    if (directoryId != null) {
      this.directoryId = directoryId;
    }
  }
}

export class PaginationOptions {
  page: number;
  limit: number;
  sort?: { [key: string]: number };
  constructor({ page, limit, sort }: Partial<PaginationOptions>) {
    this.page = page;
    this.limit = limit;
    if (sort != null) {
      this.sort = sort;
    }
  }
}

export class PaginationDirectoryQuery {
  createdUser: string;
  isRoot?: boolean;
  constructor({ createdUser, isRoot }: PaginationDirectoryQuery) {
    this.createdUser = createdUser;
    if (isRoot != null) {
      this.isRoot = isRoot;
    }
  }
}
