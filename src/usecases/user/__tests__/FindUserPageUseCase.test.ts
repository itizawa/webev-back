import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories';
import { FindUserPageUseCase } from '../FindUserPageUseCase';

describe('FindUserPageUseCase', () => {
  const mockUser = generateMockUser();
  const mock = new UserRepositoryMock();

  mock.findUserById = async (userId) => generateMockUser({ _id: userId });

  const useCase = new FindUserPageUseCase(mock);
  const spy = jest.spyOn(mock, 'findUserById');

  test('user is exist', async () => {
    const response = await useCase.execute(mockUser._id);

    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockUser._id);
  });

  test('user is null', async () => {
    const response = await useCase.execute(null);
    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(null);
  });
});
