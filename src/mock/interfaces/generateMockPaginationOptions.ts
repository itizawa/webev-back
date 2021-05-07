import { PaginationOptions } from '../../interfaces/pagination';

export const generateMockPaginationOptions = (mock: Partial<PaginationOptions> = {}): PaginationOptions => {
  const { page, limit, sort } = mock;
  return new PaginationOptions({
    page: page || 1,
    limit: limit || 10,
    sort: sort || null,
  });
};
