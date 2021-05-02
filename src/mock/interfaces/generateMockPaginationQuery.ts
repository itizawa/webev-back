import { PageStatus } from '../../domains/Page';
import { PaginationQuery } from '../../interfaces/pagination';

export const generateMockPaginationQuery = (mock: Partial<PaginationQuery> = {}): PaginationQuery => {
  const { createdUser, status, $or, isFavorite, directoryId } = mock;
  return new PaginationQuery({
    createdUser: createdUser || 'mockUserId',
    status: status || [PageStatus.PAGE_STATUS_STOCK],
    $or: $or || [{ status: PageStatus.PAGE_STATUS_STOCK }],
    isFavorite: isFavorite || false,
    directoryId: directoryId || 'mockDirectoryId',
  });
};
