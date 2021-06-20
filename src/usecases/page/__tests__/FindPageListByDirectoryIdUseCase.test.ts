import { generateMockPage, generateMockUser } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { FindPageListByDirectoryIdUseCase } from '../FindPageListByDirectoryIdUseCase';

describe('FindPageListByDirectoryIdUseCase', () => {
  const mockPage = generateMockPage({ directoryId: 'mockDirectoryId' });
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();
  mock.countAllPages = async () => 100;

  const useCase = new FindPageListByDirectoryIdUseCase(mock);

  mock.findPageListByDirectoryId = async ({ directoryId, userId }) => [generateMockPage({ directoryId, createdUser: userId })];

  const spy = jest.spyOn(mock, 'findPageListByDirectoryId');
  test('excute', async () => {
    const response = await useCase.execute(mockPage.directoryId, mockUser._id);

    expect(spy).toHaveBeenCalled();
    expect(response[0].directoryId).toBe('mockDirectoryId');
  });
});
