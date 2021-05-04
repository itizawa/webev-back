import { PageStatus } from '../../../domains/Page';
import { generateMockUser, generateMockPage } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { ArchivePageUseCase } from '../ArchivePageUseCase';

describe('ArchivePageUseCase', () => {
  const mockUser = generateMockUser();
  const mockPage = generateMockPage();
  const mock = new PageRepositoryMock();
  mock.updatePageStatus = async (_id, userId, status) => generateMockPage({ _id, createdUser: userId, status });

  const spy = jest.spyOn(mock, 'updatePageStatus');

  const useCase = new ArchivePageUseCase(mock);

  test('isArchive is true', async () => {
    const response = await useCase.execute(mockPage._id, mockUser, true);

    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(PageStatus.PAGE_STATUS_ARCHIVE);
  });

  test('isArchive is false', async () => {
    const response = await useCase.execute(mockPage._id, mockUser, false);

    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(PageStatus.PAGE_STATUS_STOCK);
  });
});
