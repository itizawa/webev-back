import { PageStatus } from '../../domains/Page';
import { PaginationQuery } from '../../interfaces/pagination';

export const generateMockPaginationQuery = (mock: Partial<PaginationQuery> = {}): PaginationQuery => {
  const { createdUser, $or, directoryId } = mock;
  return new PaginationQuery({
    createdUser: createdUser || 'mockUserId',
    $or: $or || [{ status: PageStatus.PAGE_STATUS_STOCK }],
    directoryId: directoryId || 'mockDirectoryId',
  });
};
