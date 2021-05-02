import { generateMockPage, generateMockUser, PageRepositoryMock } from '../../../mock';
import { MovePageToDirectoryUseCase } from '../MovePageToDirectoryUseCase';

describe('MovePageToDirectoryUseCase', () => {
  const mockPage = generateMockPage({ _id: 'testPageId', directoryId: 'testDirectoryId' });
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.updateDirectory = async (_id, directoryId, createdUser) => generateMockPage({ _id, directoryId, createdUser });

  const useCase = new MovePageToDirectoryUseCase(mock);

  const spy = jest.spyOn(mock, 'updateDirectory');
  test('excute', async () => {
    const response = await useCase.execute(mockPage._id, mockPage.directoryId, mockUser._id);

    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockPage._id);
    expect(response.directoryId).toBe(mockPage.directoryId);
    expect(mockUser._id).toBe(mockPage.createdUser);
  });
});
