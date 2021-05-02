import { PageStatus } from '../domains/Page';

export class PaginationQuery {
  createdUser: string;
  status: PageStatus[];
  $or: { status: PageStatus }[];
  isFavorite: boolean;
  directoryId: string;
  constructor({ createdUser, status, $or, isFavorite, directoryId }: Partial<PaginationQuery>) {
    this.createdUser = createdUser;
    this.status = status;
    this.$or = $or;
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
