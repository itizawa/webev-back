import { generateMockPage, generateMockUser } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { FindPageByIdUseCase } from '../FindPageByIdUseCase';

describe('FindPageByIdUseCase', () => {
  const mockPage = generateMockPage();
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.findPageById = async ({ pageId: _id, userId }) => generateMockPage({ _id, createdUser: userId });

  const useCase = new FindPageByIdUseCase(mock);

  const spy = jest.spyOn(mock, 'findPageById');
  test('excute', async () => {
    const response = await useCase.execute({ pageId: mockPage._id, userId: mockUser._id });

    expect(spy).toHaveBeenCalled();
    expect(response.createdUser).toBe(mockUser._id);
    expect(response._id).toBe(mockPage._id);
  });
});
