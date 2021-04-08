export interface PaginationQuery {
  [key: string]: string | number | boolean;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: { [key: string]: number };
}
