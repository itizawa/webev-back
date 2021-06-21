import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories';
import { FindUserPageUseCase } from '../FindUserPageUseCase';

describe('FindUserPageUseCase', () => {
  const mockUser = generateMockUser();
  const mock = new UserRepositoryMock();

  mock.findUserById = async ({ userId }) => generateMockUser({ _id: userId });

  const useCase = new FindUserPageUseCase(mock);
  const spy = jest.spyOn(mock, 'findUserById');

  test('exec', async () => {
    const response = await useCase.execute({ userId: mockUser._id });
    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockUser._id);
    expect(response.email).toBe(mockUser.email);
    expect(response.image).toBe(mockUser.image);
    expect(response.admin).toBe(mockUser.admin);
    expect(response.createdAt).toStrictEqual(mockUser.createdAt);
    expect(response.updatedAt).toStrictEqual(mockUser.updatedAt);
    expect(response.isExecutedTutorial).toBe(mockUser.isExecutedTutorial);
  });
});
