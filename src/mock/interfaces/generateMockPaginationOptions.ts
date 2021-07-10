import { PaginationOptions } from '../../interfaces/pagination';

export const generateMockPaginationOptions = (mock: { page?: number; limit?: number; sort?: string } = {}): PaginationOptions => {
  const { page, limit, sort } = mock;
  return new PaginationOptions({
    page: page || 1,
    limit: limit || 10,
    sort: sort || 'createdAt',
  });
};
