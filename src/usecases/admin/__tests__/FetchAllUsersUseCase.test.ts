import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories/UserRepositoryMock';
import { FetchAllUsersUseCase } from '../FetchAllUsersUseCase';

describe('FetchAllUsersUseCase', () => {
  const mock = new UserRepositoryMock();

  const mockUser = generateMockUser();

  const useCase = new FetchAllUsersUseCase(mock);

  const spy = jest.spyOn(mock, 'findAllUsers').mockImplementation(async () => [mockUser]);
  test('execute', async () => {
    const response = await useCase.execute();

    expect(spy).toHaveBeenCalled();
    expect(response).toEqual([mockUser]);
  });
});
