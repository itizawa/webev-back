import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories';
import { UpdateUserInfoUseCase } from '../UpdateUserInfoUseCase';

describe('UpdateUserInfoById', () => {
  const mockUser = generateMockUser();
  const mock = new UserRepositoryMock();

  mock.updateUserInfoById = async (userId, name) => generateMockUser({ _id: userId, name });

  const useCase = new UpdateUserInfoUseCase(mock);
  const spy = jest.spyOn(mock, 'updateUserInfoById');

  test('update user name', async () => {
    const response = await useCase.execute(mockUser._id, 'hoge');

    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockUser._id);
    expect(response.name).toBe('hoge');
    expect(response.email).toBe(mockUser.email);
    expect(response.image).toBe(mockUser.image);
    expect(response.admin).toBe(mockUser.admin);
    expect(response.createdAt).toStrictEqual(mockUser.createdAt);
    expect(response.isExecutedTutorial).toBe(mockUser.isExecutedTutorial);
  });
});
