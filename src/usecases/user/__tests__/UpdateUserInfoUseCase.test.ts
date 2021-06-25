import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories';
import { UpdateUserInfoUseCase } from '../UpdateUserInfoUseCase';

describe('UpdateUserInfoById', () => {
  const mockUser = generateMockUser();
  const mock = new UserRepositoryMock();

  mock.updateUserInfoById = async ({ userId, properity: { name } }) => generateMockUser({ _id: userId, name });

  const useCase = new UpdateUserInfoUseCase(mock);
  const spy = jest.spyOn(mock, 'updateUserInfoById');

  test('update user name', async () => {
    const response = await useCase.execute({ userId: mockUser._id, name: 'hoge' });

    expect(spy).toHaveBeenCalled();
    expect(response.name).toBe('hoge');
  });
});
