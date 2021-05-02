import { generateMockPage, generateMockUser, PageRepositoryMock } from '../../../mock';
import { FindPageByIdUseCase } from '../FindPageByIdUseCase';

describe('FindPageByIdUseCase', () => {
  const mockPage = generateMockPage();
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.findPageById = async (_id, userId) => generateMockPage({ _id, createdUser: userId });

  const useCase = new FindPageByIdUseCase(mock);

  const spy = jest.spyOn(mock, 'findPageById');
  test('excute', async () => {
    const response = await useCase.execute(mockPage._id, mockUser._id);

    expect(spy).toHaveBeenCalled();
    expect(response.createdUser).toBe(mockUser._id);
    expect(response._id).toBe(mockPage._id);
  });
});
