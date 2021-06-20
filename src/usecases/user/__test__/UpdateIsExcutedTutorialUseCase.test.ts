import { generateMockUser } from '../../../mock/domains';
import { UserRepositoryMock } from '../../../mock/repositories';
import { FindUserPageUseCase } from '../FindUserPageUseCase';

describe('UpdateIsExecutedTutorialUseCase', () => {
  const mockUser = generateMockUser();
  const mock = new UserRepositoryMock();

  mock.updateIsExecutedTutorial = async (userId) => generateMockUser({ _id: userId });

  const useCase = new FindUserPageUseCase(mock);
  const spy = jest.spyOn(mock, 'updateIsExecutedTutorial');

  test('execute', async () => {
    const response = await useCase.execute(mockUser._id);

    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockUser._id);
  });
});
