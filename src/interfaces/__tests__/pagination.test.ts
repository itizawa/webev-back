import { PageStatus } from '../../domains/Page';
import { generateMockDirectory, generateMockUser } from '../../mock/domains';
import { PaginationQuery } from '../pagination';

describe('Pagination interface test', () => {
  const mockUser = generateMockUser();
  const mockDirectory = generateMockDirectory();
  test('PaginationQuery with directoryId', async () => {
    const response = new PaginationQuery({ createdUser: mockUser._id, $or: [{ status: PageStatus.PAGE_STATUS_STOCK }], directoryId: mockDirectory._id });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.$or).toEqual([{ status: PageStatus.PAGE_STATUS_STOCK }]);
    expect(response.directoryId).toBe(mockDirectory._id);
  });

  test('PaginationQuery without directoryId', async () => {
    const response = new PaginationQuery({ createdUser: mockUser._id, $or: [{ status: PageStatus.PAGE_STATUS_DELETED }] });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.$or).toEqual([{ status: PageStatus.PAGE_STATUS_DELETED }]);
    expect(response.directoryId).toBe(undefined);
  });
});
