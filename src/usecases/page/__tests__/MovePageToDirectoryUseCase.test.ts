import { generateMockPage, generateMockUser } from '../../../mock/domains';
import { PageRepositoryMock } from '../../../mock/repositories';
import { MovePageToDirectoryUseCase } from '../MovePageToDirectoryUseCase';

describe('MovePageToDirectoryUseCase', () => {
  const mockPage = generateMockPage({ _id: 'testPageId', directoryId: 'testDirectoryId' });
  const mockUser = generateMockUser();
  const mock = new PageRepositoryMock();

  mock.updateDirectory = async ({ pageId, directoryId, userId }) => generateMockPage({ _id: pageId, directoryId, createdUser: userId });

  const useCase = new MovePageToDirectoryUseCase(mock);

  const spy = jest.spyOn(mock, 'updateDirectory');
  test('excute', async () => {
    const response = await useCase.execute({ pageId: mockPage._id, directoryId: mockPage.directoryId, userId: mockUser._id });

    expect(spy).toHaveBeenCalled();
    expect(response._id).toBe(mockPage._id);
    expect(response.directoryId).toBe(mockPage.directoryId);
    expect(mockUser._id).toBe(mockPage.createdUser);
  });
});
