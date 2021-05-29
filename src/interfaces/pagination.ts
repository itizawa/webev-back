import { PageStatus } from '../domains/Page';

export class PaginationQuery {
  createdUser: string;
  $or: Array<{ status: PageStatus }>;
  directoryId: string;
  title: string;
  constructor({ createdUser, $or, directoryId, title }: Partial<PaginationQuery>) {
    this.createdUser = createdUser;
    this.$or = $or;
    if (directoryId != null) {
      this.directoryId = directoryId;
    }
    if (title != null) {
      this.title = title;
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
