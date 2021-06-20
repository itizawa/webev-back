import { advanceTo } from 'jest-date-mock';

import { PageStatus } from '../../../domains/Page';
import { generateMockUser, generateMockPage } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { ArchivePageUseCase } from '../ArchivePageUseCase';

describe('ArchivePageUseCase', () => {
  const mockUser = generateMockUser();
  const mockPage = generateMockPage();
  const mock = new PageRepositoryMock();
  mock.updatePageStatus = async ({ pageId, userId, status, archivedAt }) => generateMockPage({ _id: pageId, createdUser: userId, status, archivedAt });

  // mock new Date() and Date.now()
  const mockDate = new Date(2000, 1, 1, 0, 0, 0);
  advanceTo(mockDate);

  const spy = jest.spyOn(mock, 'updatePageStatus');
  const useCase = new ArchivePageUseCase(mock);

  test('isArchive is true', async () => {
    const response = await useCase.execute({ pageId: mockPage._id, userId: mockUser._id, isArchive: true });

    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(PageStatus.PAGE_STATUS_ARCHIVE);
    expect(response.archivedAt.toString()).toBe(mockDate.toString());
  });

  test('isArchive is false', async () => {
    const response = await useCase.execute({ pageId: mockPage._id, userId: mockUser._id, isArchive: false });

    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(PageStatus.PAGE_STATUS_STOCK);
    expect(response.archivedAt).toBe(null);
  });
});
