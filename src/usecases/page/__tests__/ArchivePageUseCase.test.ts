import { PageStatus } from '../../../domains/Page';
import { generateMockUser } from '../../../mock/generateMockUser';
import { generateMockPage } from '../../../mock/generateMockPage';
import { ArchivePageUseCase } from '../ArchivePageUseCase';
import { PageRepositoryMock } from '../../../mock/PageRepositoryMock';

describe('ArchivePageUseCase', () => {
  const mock = new PageRepositoryMock();
  const mockUser = generateMockUser();
  const mockPage = generateMockPage({});
  const useCase = new ArchivePageUseCase(mock);
  test('isArchive is true', async () => {
    const response = await useCase.execute(mockPage._id, mockUser, true);
    expect(response.status).toBe(PageStatus.PAGE_STATUS_ARCHIVE);
  });

  test('isArchive is false', async () => {
    const response = await useCase.execute(mockPage._id, mockUser, false);
    expect(response.status).toBe(PageStatus.PAGE_STATUS_STOCK);
  });
});
