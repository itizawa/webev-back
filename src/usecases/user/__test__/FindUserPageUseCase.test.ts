import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories';
import { FindUserPageUseCase } from '../FindUserPageUseCase';

describe('FindUserPageUseCase', () => {
  const mockUser = generateMockUser();
  //   const mockPage = generateMockPage();
  const mock = new UserRepositoryMock();

  mock.findUserById = async (userId) => generateMockUser({ _id: userId });

  const useCase = new FindUserPageUseCase(mockUser._id);
  const spy = jest.spyOn(mock, 'findUserById');

  test('isFindUserPage', async () => {
    const response = await useCase.execute(mockUser._id);

    expect(spy).toHaveBeenCalled();
    // expect(response._id).toBe(mockPage._id);
  });
});
