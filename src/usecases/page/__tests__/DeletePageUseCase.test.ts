import { PageStatus } from '../../../domains/Page';
import { generateMockPage, generateMockUser, PageRepositoryMock } from '../../../mock';
import { DeletePageUseCase } from '../DeletePageUseCase';

describe('DeletePageUseCase', () => {
  const mockPage = generateMockPage();
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.updatePageStatus = async (_id, userId) => generateMockPage({ _id, createdUser: userId, status: PageStatus.PAGE_STATUS_DELETED });

  const useCase = new DeletePageUseCase(mock);

  const spy = jest.spyOn(mock, 'updatePageStatus');
  test('excute', async () => {
    const response = await useCase.execute(mockPage._id, mockUser);

    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(PageStatus.PAGE_STATUS_DELETED);
  });
});
