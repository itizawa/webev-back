import { PageStatus } from '../../domains/Page';
import { generateMockDirectory, generateMockUser } from '../../mock/domains';
import { PaginationQuery, PaginationOptions, PaginationDirectoryQuery } from '../pagination';

describe('Pagination interface test', () => {
  const mockUser = generateMockUser();
  const mockDirectory = generateMockDirectory();
  test('PaginationQuery with directoryId', async () => {
    const response = new PaginationQuery({ createdUser: mockUser._id, status: [PageStatus.PAGE_STATUS_STOCK], directoryId: mockDirectory._id });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.status).toEqual({ $in: [PageStatus.PAGE_STATUS_STOCK] });
    expect(response.directoryId).toBe(mockDirectory._id);
  });

  test('PaginationQuery without directoryId', async () => {
    const response = new PaginationQuery({ createdUser: mockUser._id, status: [PageStatus.PAGE_STATUS_DELETED] });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.status).toEqual({ $in: [PageStatus.PAGE_STATUS_DELETED] });
    expect(response.directoryId).toBe(undefined);
  });

  test('PaginationOptions with sort', async () => {
    const response = new PaginationOptions({ page: 1, limit: 20, sort: 'createdAt' });
    expect(response.page).toBe(1);
    expect(response.limit).toBe(20);
    expect(response.sort).toEqual({ createdAt: 1 });
  });

  test('PaginationOptions with sort', async () => {
    const response = new PaginationOptions({ page: 1, limit: 20, sort: '-createdAt' });
    expect(response.page).toBe(1);
    expect(response.limit).toBe(20);
    expect(response.sort).toEqual({ createdAt: -1 });
  });

  test('PaginationOptions without sort', async () => {
    const response = new PaginationOptions({ page: 1, limit: 20 });
    expect(response.page).toBe(1);
    expect(response.limit).toBe(20);
    expect(response.sort).toEqual(undefined);
  });

  test('PaginationDirectoryQuery with isRoot is true', async () => {
    const response = new PaginationDirectoryQuery({ createdUser: mockUser._id, isRoot: true });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.isRoot).toBe(true);
  });

  test('PaginationDirectoryQuery with isRoot is false', async () => {
    const response = new PaginationDirectoryQuery({ createdUser: mockUser._id, isRoot: false });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.isRoot).toBe(false);
  });
  test('PaginationDirectoryQuery without isRoot', async () => {
    const response = new PaginationDirectoryQuery({ createdUser: mockUser._id });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.isRoot).toBe(undefined);
  });

  test('PaginationQuery $or', async () => {
    const q = 'mockQ';
    const response = new PaginationQuery({ createdUser: mockUser._id, q });
    expect(response.createdUser).toBe(mockUser._id);
    expect(response.$or).toEqual([{ title: new RegExp(q) }, { siteName: new RegExp(q) }, { description: new RegExp(q) }]);
  });
});
