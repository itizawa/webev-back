import { PageStatus } from '../../../domains/Page';
import { generateMockPage, generateMockUser } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { DeletePageUseCase } from '../DeletePageUseCase';

describe('DeletePageUseCase', () => {
  const mockPage = generateMockPage();
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.updatePageStatus = async ({ pageId, userId }) => generateMockPage({ _id: pageId, createdUser: userId, status: PageStatus.PAGE_STATUS_DELETED });

  const useCase = new DeletePageUseCase(mock);

  const spy = jest.spyOn(mock, 'updatePageStatus');
  test('excute', async () => {
    const response = await useCase.execute({ pageId: mockPage._id, userId: mockUser._id });

    expect(spy).toHaveBeenCalled();
    expect(response.status).toBe(PageStatus.PAGE_STATUS_DELETED);
  });
});
